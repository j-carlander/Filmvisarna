    /* Select all screenings that are older than 14 days from today but no older than 6 weeks from last screening and add 6 weeks to the date */
    SELECT DATE_ADD(date, INTERVAL 42 DAY ),
    movieid,
    theatreid,
    languageid,
    subtitleid  
    FROM screenings 
    WHERE date < DATE_SUB(NOW(), INTERVAL 14 DAY )
    ORDER BY date;
    
    /* Create event to update screenings older than 14 day from today with a new date 6 weeks from its original date */
	CREATE EVENT IF NOT EXISTS update_screenings
	ON SCHEDULE EVERY 1 WEEK
	ENDS NOW() + INTERVAL 2 YEAR
	DO
		UPDATE screenings
		SET date = DATE_ADD(date, INTERVAL 42 DAY )
		WHERE date < DATE_SUB(NOW(), INTERVAL 14 DAY ); 
   
	SHOW EVENTS FROM filmvisarna;

    