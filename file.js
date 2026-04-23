const fs = require("fs");

// reading files
/*
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(err);
  }

  console.log(data.toString());
});

console.log("last line");
*/

// ***********************************************************

// writing files
/*
fs.writeFile("./docs/blog1.txt", "Hello, world!", () => {
  console.log("file was written");
});

// If the file does not exist, it will be created. If it does exist, it will be overwritten. To append to a file, we can use the fs.appendFile() method.
fs.writeFile("./docs/blog2.txt", "Hello, world!", () => {
  console.log("file was written");
});

fs.appendFile("./docs/blog1.txt", "\nHello, Devs!", () => {
  console.log("file was written");
});
*/

// ***********************************************************

// directories
/*
// creating folders by first checking if they exist
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("folder deleted");
  });
}

// deleting folders by first checking if they exist
if (fs.existsSync("./assets")) {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("folder deleted");
  });
}
*/

// ***********************************************************

// deleting files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
  });

  console.log("file deleted");
} else {
  console.log("file does not exist");
}
