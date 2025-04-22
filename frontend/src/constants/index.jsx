import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#feature" },
  { label: "Workflow", href: "#workflow" },
  { label: "Testimonials", href: "#testimonial" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Sentiment Analysis",
    description:
      "Classifies messages into emotions like Joy, Sad, Angry, Fear, Surprise, and Love, helping users better understand the tone of conversations.",
  },
  {
    icon: <Fingerprint />,
    text: "Real-Time Chat System",
    description:
      "Instant communication using WebSockets (Socket.IO) built on the MERN stack for smooth, uninterrupted messaging across all devices.",
  },
  {
    icon: <ShieldHalf />,
    text: "Interactive User Interface",
    description:
      "A clean, modern UI that displays emotion tags alongside each message, highlights unread chats, and shows live user activity.",
  },
  {
    icon: <BatteryCharging />,
    text: "Hybrid AI Models",
    description:
      "Combines Logistic Regression for fast inference and LSTM for deep contextual understanding, delivering accurate results in real-time.",
  },
  {
    icon: <PlugZap />,
    text: "Scalable Architecture",
    description:
      "Backed by microservices and Dockerized ML APIs, the system is easy to scale and maintain, with emotion detection fully handled on the backend.",
  },
  {
    icon: <GlobeLock />,
    text: "Secure and Privacy-First",
    description:
      "All messages are processed securely, with no emotional data stored, ensuring a safe and private chatting experience.",
  },
];

export const checklistItems = [
  {
    title: "Message Composed",
    description:
      "Users type and send messages using a clean, user-friendly chat interface.",
  },
  {
    title: "Real-Time Messaging",
    description:
      "Messages are delivered in real-time, ensuring smooth and instant communication.",
  },
  {
    title: "Emotion Analysis",
    description:
      "Each message is automatically analyzed to detect the sender’s emotion.",
  },
  {
    title: "Emotion Feedback",
    description:
      "The detected emotion is instantly shown below the message, enhancing conversation clarity and connection.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
