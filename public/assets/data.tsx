const posts = [
  {
    id: 1,
    username: "dev_community",
    avatar: "/images/user-3.png",
    location: "San Francisco, CA",
    imageUrl: "/images/art2.png",
    caption:
      "Just launched our new component library! Focus on accessibility and clean state management. #reactjs #webdev #a11y",
    likes: 1542,
    comments: 34,
    time: "2 hours ago",
    isLiked: false,
    isVerified: true,
  },
  {
    id: 2,
    username: "travel_explorer",
    avatar: "/images/user-4.png",
    location: "Kyoto, Japan",
    imageUrl: "/images/art1.png",
    caption:
      "Finding inspiration in the ancient city of Kyoto. Who else is mixing work and travel? ✈️ #digitalnomad #worklifebalance #japan",
    likes: 890,
    comments: 12,
    time: "4 hours ago",
    isLiked: true,
    isVerified: false,
  },
  {
    id: 3,
    username: "ui_designer",
    avatar: "/images/user-5.png",
    location: "Remote",
    imageUrl: "/images/art3.png",
    caption:
      "Finished the latest design system prototype. Focusing on modularity and dark mode implementation. Feedback welcome! 🤔 #designsystem #uiux #figma",
    likes: 245,
    comments: 8,
    time: "1 day ago",
    isLiked: false,
    isVerified: true,
  },
];

const stories = [
  {
    id: 1,
    user: "Your Story",
    avatar: "/images/user-1.png",
    isNew: false,
  },
  {
    id: 2,
    user: "code_guru",
    avatar: "/images/user-2.png",
    isNew: true,
  },
  {
    id: 3,
    user: "design_wiz",
    avatar: "/images/user-5.png",
    isNew: true,
  },
  {
    id: 4,
    user: "travel_bug",
    avatar: "/images/user-3.png",
    isNew: false,
  },
  {
    id: 5,
    user: "foodie_joy",
    avatar: null,
    isNew: true,
  },
  {
    id: 6,
    user: "nature_lover",
    avatar: "/images/user-4.png",
    isNew: false,
  },
  {
    id: 7,
    user: "react_fan",
    avatar: "/images/user-6.png",
    isNew: true,
  },
  {
    id: 8,
    user: "javascript_guru",
    avatar: "/images/user-4.png",
    isNew: true,
  },
  {
    id: 9,
    user: "react_king",
    avatar: "/images/user-2.png",
    isNew: true,
  },
];

const suggestions = [
  {
    name: "design_trends",
    src: "images/mi-logo.png",
  },
  {
    name: "tech_news",
    src: "images/mit.png",
  },
  {
    name: "daily_motivation",
    src: "/images/slack.png",
  },
];

const styles = `
  /* Hide scrollbars for specific elements */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, and Opera */
  }
  
  /* Instagram logo style (using a common script font aesthetic) */
  .insta-logo {
    font-family: 'inter','inter';
    font-size: 1.8rem;
    padding-top: 0.1rem;
    
  }
`;

export { posts, stories, styles, suggestions };
