import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessagesModel.js";

// search contacts when user search it in search bar
export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "searchTerm is required",
      });
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [
            { firstName: regex },
            { lastName: regex },
            { email: regex },
            { userName: regex },
          ],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getContactsForDMList = async (req, res) => {
  try {
    let {userId} = req;
    // userId = new mongoose.Types.ObjectId(userId);
    if (typeof userId === "string") {
      userId = new mongoose.Types.ObjectId(userId);
    }
    const contacts = await Message.aggregate([
      {
        $match:{
          $or:[{sender:userId},{recipient:userId}]
        }
      },
      {
        $sort:{timestamp:-1}
      },
      {
        $group:{
          _id:{
            $cond:{
              if:{$eq:["$sender",userId]},
              then:"$recipient",
              else:"$sender"
            }
          },
          lastMessageTime:{$first:"$timestamp"}
        }
      },
      {
        $lookup:{
          from:"users",
          localField:"_id",
          foreignField:"_id",
          as:"contactInfo"
        }
      },
      {
        $unwind:"$contactInfo"
      },
      {
        $project:{
          _id:1,
          lastMessageTime:1,
          email:"$contactInfo.email",
          firstName:"$contactInfo.firstName",
          lastName:"$contactInfo.lastName",
          profImage:"$contactInfo.profImage",
          color:"$contactInfo.color",

        }
      },
      {
        $sort:{lastMessageTime:-1}
      }
    ])


    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
