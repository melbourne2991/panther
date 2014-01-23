source ~/.bash_profile
x-terminal-emulator -e coffee -o js/ -cw coffeescript/
x-terminal-emulator -e karma start karma.config.js
x-terminal-emulator -e rails s

#http://0.0.0.0:3000/api/products?q[classifications_taxon_id_in]=3

