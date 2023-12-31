import { validationResult } from 'express-validator';
import Donation from '../models/donation.js';

// Récupérer toutes les dons
export function getAllDonations(req, res) {
  Donation.find({})
    .then((donations) => {
      let donationList = donations.map((donation) => ({
        id: donation._id,
         title: donation.title,
         description: donation.description,
        quantity: donation.quantity,
        date: donation.date,
        status: donation.status,
      }));
      res.status(200).json(donationList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Créer une nouvelle donation
export function createDonation(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Donation.create({
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      date: req.body.date,
      status: req.body.status || 'En attente',
    })
      .then((newDonation) => {
        res.status(201).json({
          id: newDonation._id,
          title: newDonation.title,
          description: newDonation.description,
          quantity: newDonation.quantity,
          date: newDonation.date,
          status: newDonation.status,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Récupérer une donation par son ID
export function getDonationById(req, res) {
  Donation.findById(req.params.id)
    .then((donation) => {
      if (!donation) {
        return res.status(404).json({ message: 'Donation non trouvée' });
      }
      res.status(200).json({
        id: donation._id,
        title: donation.title,
        description: donation.description,
        quantity: donation.quantity,
        date: donation.date,
        status: donation.status,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour une donation
export function updateDonation(req, res) {
  let newDonation = {
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity,
    date: req.body.date,
    status: req.body.status || 'En attente',
  };

  Donation.findByIdAndUpdate(req.params.id, newDonation, { new: true })
    .then((updatedDonation) => {
      if (!updatedDonation) {
        return res.status(404).json({ message: 'Donation non trouvée' });
      }
      res.status(200).json({
        id: updatedDonation._id,
        title: updatedDonation.title,
        description: updatedDonation.description,
        quantity: updatedDonation.quantity,
        date: updatedDonation.date,
        status: updatedDonation.status,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Supprimer une donation
export function deleteDonation(req, res) {
  Donation.findByIdAndDelete(req.params.id)
    .then((deletedDonation) => {
      if (!deletedDonation) {
        return res.status(404).json({ message: 'Donation non trouvée' });
      } else {
        res.status(200).json({ message: 'Donation supprimée avec succès' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

/*
 // POST api
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(7001, () => {
  console.log("listening to port 7001");
});

const donation = [];

// post api
app.post("/donation/donations", (req, res) => {
  console.log("Result", req.body);

  const pdata = {
    _id: donation.length + 1,
    quantity: req.body.quantity, // Corrected property name
    date: req.body.date,         // Corrected property name
    status: req.body.status        // Corrected property name
  };

  donation.push(pdata);
  console.log("Final", donation);

  res.status(200).send({
    "status-code": 200,
    message: "donation added Successfully",
    Donation: pdata,
  });
});*/

}

