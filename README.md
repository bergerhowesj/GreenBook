#               GreenBook

GreenBook is a digital adaptation of the green health and growth record given to
parents at the birth of their child. In an endeavour to eliminate lost records and for
ease of access via mobile phones, GreenBook securely stores this information in a
digital database that can be accessed anywhere the internet is available.

GreenBook runs a React.js frontend and a Ruby on Rails backend with a PostgreSQL database.
These technologies were used as to provide a modern framework and ease of updating for
future iterations of GreenBook.

The future of GreenBook is vast both through digital adaptations such as geolocation
for nearby clinics, appointment setting and calendar updates, and as a reference guide
for parents with further information such as first aid, feeding guides and timers, milestone
journals and plenty more. As the developer I would love this website to be used and developed
as a "one stop shop" for all parents.

Further iterations of GreenBook will also have the local hospitals and clinics etc as a database
with the ability to add as a secondary function, for now however this information will need to be
provided. Additionally a desktop version will be developed to allow for easier input of information,
with the mobile version to be used more as an "on-the-go" reference and journaling tool. The ability
add notes and comments will be implemented shortly also.

GreenBook will also be hosted to allow for use anywhere any time, currently GreenBook is in a
localhost state.

In the interest of confidence in GreenBook, the upcoming versions of GreenBook will include testing
to ensure stability.

#   Ruby version:
*        3.0.1

#   For PostgreSQL database:

    Versions 9.3 and up are supported.
*    Install the pg driver:
*        gem install pg
*    On macOS with Homebrew:
*        gem install pg -- --with-pg-config=/usr/local/bin/pg_config
*    On macOS with MacPorts:
*        gem install pg -- --with-pg-config=/opt/local/lib/postgresql84/bin/pg_config
*    On Windows:
*        gem install pg
*        Choose the win32 build.
*        Install PostgreSQL and put its /bin directory on your path.

*    Configure Using Gemfile
*       gem "pg"

#    To migrate the database: 
*        rake db:migrate

#   For trialing, GreenBook can be seeded by running:
*        rake db:seed

#   To run GreenBook locally:
*        npm install
*        bundle install
*        rails start
*        npm start

To use GreenBook as a new user, a child must be added followed by the child's
birth details (these can be edited later).

I hope that GreenBook is able there to help those who have enough on their plate already.

Any questions or suggestions please contact me via https://github.com/happymelonbox/green_book .

Justin.
