import express, { Request, Response } from "express";

import Event from "../models/Event";
import User from "../models/User";

async function getEvents(req: Request, res: Response): Promise<void> {
  const allEvents = await Event.find()
    .populate("usersList", "name age creationDate events")
    .populate("admin", "name age creationDate events");
  if (allEvents.length == 0) {
    res.status(404).send("There are no events yet!");
  } else {
    res.status(200).send(allEvents);
  }
}

async function getEventByName(req: Request, res: Response): Promise<void> {
  const eventFound = await Event.findOne({
    name: req.params.name,
  })
    .populate("usersList", "name age creationDate events")
    .populate("admin", "name age creationDate events");
  if (eventFound == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send(eventFound);
  }
}

async function getEventsByUserName(req: Request, res: Response): Promise<void> {
  const user = await User.findOne({ name: req.params.name });
  const eventFound = await Event.find({
    usersList: user,
  })
    .populate("usersList", "name age creationDate events")
    .populate("admin", "name age creationDate events");
  if (eventFound == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send(eventFound);
  }
}

async function addEvent(req: Request, res: Response): Promise<void> {
  const { name, description, category } = req.body;
  const userFound = await User.findOne({
    name: req.params.nameUser,
  });
  const newEvent = new Event({
    name: name,
    description: description,
    admin: userFound,
    usersList: userFound,
    category: category,
  });
  await newEvent.save();
  res.status(200).send("Event added!");
}

async function joinEvent(req: Request, res: Response): Promise<void> {
  try {
    const { userName, eventName } = req.params;
    console.log(req.params);
    const user = await User.findOne({
      name: userName,
    });
    if (user == null || user.name != userName) {
      res.status(404).send({ message: "Error. User not found." });
      return;
    }
    const event = await Event.findOne({ name: eventName });
    if (event == null) {
      res.status(404).send({ message: "Error. Event not found." });
      return;
    }
    Event.findOneAndUpdate(
      { name: eventName },
      { $push: { usersList: user } },
      function (error) {
        if (error) {
          res.status(500).send({ message: "Error adding the user to event." });
          return;
        }
      }
    );
    res
      .status(200)
      .send({ message: "User " + user.name + " joined the event!" });
  } catch (e) {
    res.status(500).send({ message: `Server error: ${e}` });
  }
}

async function leaveEvent(req: Request, res: Response): Promise<void> {
  try {
    const { userName, eventName } = req.params;
    const user = await User.findOne({ name: userName });
    if (user == null || user.name != userName) {
      res.status(404).send({ message: "Error. User not found." });
      return;
    }
    const event = await Event.findOne({ name: eventName });
    if (event == null) {
      res.status(404).send({ message: "Error. Event not found." });
      return;
    }
    Event.findOneAndUpdate(
      { name: eventName },
      { $pull: { usersList: user._id } },
      function (error) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .send({ message: "Error deleting the user to event." });
          return;
        } else {
          res.status(200).send({
            message: "User " + user.name + " left the event",
          });
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: `Server error: ${e}` });
  }
}

async function updateEvent(req: Request, res: Response): Promise<void> {
  const eventToUpdate = await Event.findOneAndUpdate(
    { name: req.params.nameEvent },
    req.body
  );
  if (eventToUpdate == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send("Updated!");
  }
}

async function deleteEvent(req: Request, res: Response): Promise<void> {
  const eventToDelete = await Event.findOneAndDelete(
    { name: req.params.nameEvent },
    req.body
  );
  if (eventToDelete == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send("Deleted!");
  }
}

let router = express.Router();

router.get("/", getEvents);
router.get("/:name", getEventByName);
router.get("/user/:name", getEventsByUserName);
router.post("/:nameUser", addEvent);
router.put("/join/:userName/:eventName", joinEvent);
router.put("/leave/:userName/:eventName", leaveEvent);
router.put("/:nameEvent", updateEvent);
router.delete("/:nameEvent", deleteEvent);

export default router;
