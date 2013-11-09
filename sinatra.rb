require 'sinatra'
require 'mongo'
require 'json/ext'

include Mongo

configure do
  conn = MongoClient.new("localhost", 27017)
  set :mongo_connection, conn
  set :mongo_db, conn.db('test')
end 

get '/' do
  colls = settings.mongo_db.collection_names
  "Welcome radders #{colls}"
end

get '/users' do
  content_type :json
  settings.mongo_db['test'].find.to_a.to_json
end

#post '/users' do
#  content_type :json
#  settings.mongo_db['users']
#end

#get '/pokemons' do

#end

#post '/pokemons' do

#end

#get '/sessions' do

#end

#post '/sessions' do

#end
