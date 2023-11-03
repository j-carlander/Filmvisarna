INSERT INTO
    screenings (
        date,
        movieid,
        theatreid,
        languageid,
        subtitleid
    )
SELECT DATE_ADD(date, interval 28 day), movieid, theatreid, languageid, subtitleid FROM screenings 
