import { UserRepository, setupDb } from "../db";
import { User } from "../db/entity/User";

const generateRandomUsers = (count: number) => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    const isMentor = Math.random() > 0.5;
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    const commonProfile = {
      1: alpha[Math.floor(Math.random() * alpha.length)],
      2: alpha[Math.floor(Math.random() * alpha.length)],
      3: Math.floor(Math.random() * 100),
    };
    const user = new User();
    user.telegramId = Math.floor(Math.random() * 1000000);
    user.isMentor = isMentor;

    const topics = [
      { id: 1, value: "JavaScript" },
      { id: 2, value: "TypeScript" },
      { id: 3, value: "Python" },
      { id: 4, value: "Java" },
      { id: 5, value: "C++" },
      { id: 6, value: "C#" },
      { id: 7, value: "Ruby" },
      { id: 8, value: "Go" },
      { id: 9, value: "Rust" },
      { id: 10, value: "PHP" },
    ];

    const randomTopics = topics
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * topics.length))
      .map((topic) => topic.id);
    if (isMentor) {
      user.profile = {
        ...commonProfile,
        4: alpha[Math.floor(Math.random() * alpha.length)],
        5: randomTopics,
        6: alpha[Math.floor(Math.random() * alpha.length)],
        8: "https://" + alpha[Math.floor(Math.random() * alpha.length)],
      };
    } else {
      user.profile = {
        ...commonProfile,
        7: randomTopics,
      };
    }
    users.push(user);
  }
  return users;
};

setupDb().then(() => {
  const users = generateRandomUsers(100);
  UserRepository.save(users);
});
