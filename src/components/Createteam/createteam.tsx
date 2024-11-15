"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateRandomTeamId } from "../Generaterandom/randomtext";
import { createTeam } from "@/action/actions";
import { X, Users, MapPin } from "lucide-react";

const Createteam = () => {
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
  const creatorId =
    typeof window !== "undefined" ? localStorage.getItem("id") || "" : "";
  const [teamid, setTeamid] = useState(generateRandomTeamId());
  const [teamname, setTeamname] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formVisible, setFormVisible] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!teamname || !teamid || !email) {
      setStatus("error");
      setMessage("Please fill in all fields and ensure you are logged in.");
      return;
    }

    setStatus("loading");
    setMessage("Creating Team...");

    try {
      await createTeam(creatorId, teamid, teamname, destination);
      setStatus("success");
      setMessage("Team created successfully!");

      // Reset form after successful creation
      setTimeout(() => {
        setTeamid(generateRandomTeamId());
        setTeamname("");
        setDestination("");
        setFormVisible(false);
        setMessage("");
        setStatus("idle");
        router.refresh();
      }, 2000);
    } catch (err) {
      console.log(err);
      setStatus("error");
      setMessage("Error creating team. Please try again.");
    }
  };

  const handleClose = () => {
    setFormVisible(false);
    setMessage("");
    setStatus("idle");
    setTeamname("");
    setDestination("");
    setTeamid(generateRandomTeamId());
  };

  const getMessageColor = () => {
    switch (status) {
      case "error":
        return "text-red-600";
      case "success":
        return "text-green-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {!formVisible ? (
        <button
          onClick={() => setFormVisible(true)}
          className="inline-flex items-center gap-2 px-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md"
        >
          <Users size={20} />
          Create a New Team
        </button>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-100 relative animate-fadeIn">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Team
            </h2>
            <p className="text-sm text-gray-500 mt-1">Team ID: {teamid}</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={teamname}
                onChange={(e) => setTeamname(e.target.value)}
                placeholder="Enter Team Name"
                className="border border-gray-300 rounded-md p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Destination"
                className="border border-gray-300 rounded-md p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-200 ${
                status === "loading"
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {status === "loading" ? "Creating Team..." : "Create Team"}
            </button>

            {message && (
              <p
                className={`mt-4 text-center ${getMessageColor()} transition-colors`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Createteam;
