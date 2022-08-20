USE spitwit;
drop table users;
CREATE TABLE IF NOT EXISTS users (
	id int primary key not null AUTO_INCREMENT,
	userId VARCHAR(30) UNIQUE NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255),
    twitterHandle VARCHAR(15) NOT NULL,
    oAuthToken VARCHAR(255) NOT NULL,
	expiresAt LONG NOT NULL,
	refreshToken VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    isActive BOOLEAN NOT NULL DEFAULT(TRUE),
    inActiveDate DATETIME
);