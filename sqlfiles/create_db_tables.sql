CREATE DATABASE filmvisarna;

USE filmvisarna;

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fname VARCHAR(255) NOT NULL,
        lname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role enum("user", "admin", "super") NOT NULL
    );

CREATE TABLE
    theatres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

CREATE TABLE
    theatrerows (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rownumber INT NOT NULL,
        numberofseats INT NOT NULL,
        theatreid INT NOT NULL,
        FOREIGN KEY (theatreid) REFERENCES theatres (id)
    );

CREATE TABLE
    languages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        language VARCHAR(255) NOT NULL
    );

CREATE TABLE
    categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(255) NOT NULL
    );

CREATE TABLE
    names (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

CREATE TABLE
    movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        image MEDIUMBLOB NOT NULL,
        trailerlink VARCHAR(500) NOT NULL,
        durationinminutes INT NOT NULL,
        agelimit INT NOT NULL,
        directorid INT NOT NULL,
        releasedate DATE NOT NULL,
        FOREIGN KEY (directorid) REFERENCES names(id)
    );

CREATE TABLE
    moviecategories (
        categoryid INT NOT NULL,
        movieid INT NOT NULL,
        FOREIGN KEY (categoryid) REFERENCES categories (id),
        FOREIGN KEY (movieid) REFERENCES movies (id),
        CONSTRAINT id PRIMARY KEY (categoryid, movieid)
    );

CREATE TABLE
    movieactors (
        nameid INT NOT NULL,
        movieid INT NOT NULL,
        FOREIGN KEY (nameid) REFERENCES names (id),
        FOREIGN KEY (movieid) REFERENCES movies (id),
        CONSTRAINT id PRIMARY KEY (nameid, movieid)
    );

CREATE TABLE
    screenings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATETIME NOT NULL,
        movieid INT NOT NULL,
        theatreid INT NOT NULL,
        languageid INT NOT NULL,
        subtitleid INT NOT NULL,
        FOREIGN KEY (movieid) REFERENCES movies (id),
        FOREIGN KEY (theatreid) REFERENCES theatres (id),
        FOREIGN KEY (languageid) REFERENCES languages (id),
        FOREIGN KEY (subtitleid) REFERENCES languages (id)
    );

CREATE TABLE
    bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bookedat DATETIME NOT NULL,
        bookingnumber VARCHAR(255) UNIQUE NOT NULL,
        screeningid INT NOT NULL,
        userid INT,
        guestemail VARCHAR(255),
        FOREIGN KEY (screeningid) REFERENCES screenings (id),
        FOREIGN KEY (userid) REFERENCES users (id)
    );

CREATE TABLE
    tickettypes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL
    );

CREATE TABLE
    tickets (
        bookingid INT NOT NULL,
        seatrow INT NOT NULL,
        seatnumber INT NOT NULL,
        tickettypeid INT NOT NULL,
        screeningid INT NOT NULL,
        FOREIGN KEY (bookingid) REFERENCES bookings (id) ON DELETE CASCADE,
        FOREIGN KEY (tickettypeid) REFERENCES tickettypes (id),
        FOREIGN KEY (screeningid) REFERENCES screenings (id),
        CONSTRAINT id PRIMARY KEY (
            screeningid,
            seatrow,
            seatnumber
        )
    );