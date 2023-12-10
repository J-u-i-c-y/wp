<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_site' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'd-R,^=@IvVjQt0xVV,l*p/-#&4r !%U-fw|qBJu_&z#!nDMST9u%%WeA4{5dL/h$' );
define( 'SECURE_AUTH_KEY',  '6AdWbt4G2lpA~*8q{cZ|2JBX<}Dyo-wQ8ka/m#q.FGdWPk>3HtM,Zh7UEL-K*DgH' );
define( 'LOGGED_IN_KEY',    'x.-)q>vMczj+PB<XR=$JKS/7/<Bt8l.q(/<^@89~AP,H+l)85s8EL(3H:~7/%}a`' );
define( 'NONCE_KEY',        '_3{@oBGXnO*gDG(UO&&FRnB|[#`>c,3-zti}H2qlSr.!5m-0GO[me%QQ.sJl}/KQ' );
define( 'AUTH_SALT',        'L>upy>{16N^J&*Ou).P<TnBb8)xEglX8VN1$Nak(~c%txywJpw,~40k:DO>X7(Fk' );
define( 'SECURE_AUTH_SALT', 'c8}:HQtb|l(s^62fKHGW?;TRc0t&5[7YL4;D#bjt)7?kQg@NHs$wVQWGQo-$paB0' );
define( 'LOGGED_IN_SALT',   'P(2%.E)BG-y*`-l}dpy*d&Gx(,e>w) Z-)?4)FqOdD%g_SA?I/$!F>sy^~q FQ+Y' );
define( 'NONCE_SALT',       'gn$AyX}i w/k}yna!LY>|d2v%~ym~j*:DH`/L$Tk}=]FeQ|m|>pA~Ip&IcABTP;i' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
