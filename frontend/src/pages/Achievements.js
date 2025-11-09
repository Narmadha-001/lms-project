import React from "react";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Completed React Module",
      level: "Gold",
      progress: 100,
      description: "Finished all lessons and assignments in React course.",
    },
    {
      id: 2,
      title: "Java Spring Boot Basics",
      level: "Silver",
      progress: 75,
      description: "Completed 75% of the Spring Boot lessons.",
    },
    {
      id: 3,
      title: "Database Fundamentals",
      level: "Bronze",
      progress: 45,
      description: "Working on SQL and ER modeling fundamentals.",
    },
  ];

  const getBadgeColor = (level) => {
    switch (level) {
      case "Gold":
        return "bg-yellow-400 text-yellow-900";
      case "Silver":
        return "bg-gray-300 text-gray-800";
      case "Bronze":
        return "bg-orange-400 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Achievements</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-white p-5 shadow-lg rounded-xl border"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{achievement.title}</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                  achievement.level
                )}`}
              >
                {achievement.level}
              </span>
            </div>

            <p className="text-gray-600 mt-2">{achievement.description}</p>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>

              <p className="text-right text-sm font-medium mt-1">
                {achievement.progress}% Complete
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
