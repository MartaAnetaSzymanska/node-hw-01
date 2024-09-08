// contacts.js
const { nanoid } = require("nanoid");
const fs = require("node:fs").promises;
const path = require("node:path");
/*
 * const contactsPath - wskazuje na ścieżkę do pliku z kontaktami contacts.json
 */
const contactsPath = "./db/contacts.json";

// funkcja pobierania i wyświetlania kontaktów
function listContacts() {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));

  //   Odczytaj plik
  file.then((data) => {
    // Przekonwertuj zawartość pliku na ciąg znaków (dane pobrane z pliku są surowe tzw. Buffer)
    const dataStr = data.toString();

    // przekonwertuj ciąg znaków na JSON i wrzuć do tabeli
    console.table(JSON.parse(dataStr));
  });
}

function getContactById(contactId) {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  //   Odczytaj plik
  file.then((data) => {
    // Przekonwertuj zawartość pliku na ciąg znaków (dane pobrane z pliku są surowe tzw. Buffer)
    const dataStr = data.toString();
    // przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(dataStr);
    // Przefiltruj JSON w poszukiwaniu pożądanego kontaktu
    console.log(result.find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  //   Odczytaj plik
  file.then((data) => {
    // Przekonwertuj zawartość pliku na ciąg znaków (dane pobrane z pliku są surowe tzw. Buffer)
    const dataStr = data.toString();
    // przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(dataStr);
    // Przefiltruj JSON w poszukiwaniu pożądanego kontaktu
    const afterDelete = result.filter((contact) => contact.id !== contactId);
    // Zapisz plik contacts.json
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete))
      .then(() => {
        console.log("Zapis do pliku zakończony powodzeniem".green);
      })
      .catch(() => {
        console.err("Zapis do pliku zakończony niepowodzeniem".red);
      });
  });
}

function addContact(name, email, phone) {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  //   Odczytaj plik
  file.then((data) => {
    // Przekonwertuj zawartość pliku na ciąg znaków (dane pobrane z pliku są surowe tzw. Buffer)
    const dataStr = data.toString();
    // przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(dataStr);
    // Dodaj kontakt do listy kontaktów
    result.push({
      id: nanoid(21),
      name,
      email,
      phone,
    });
    // Zapisz plik contacts.json
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(result))
      .then(() => {
        console.log("Zapis do pliku zakończony powodzeniem".green);
      })
      .catch(() => {
        console.err("Zapis do pliku zakończony niepowodzeniem".red);
      });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
