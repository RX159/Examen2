const request = require('request')

const express = require('express')

const app = express()

const port = process.env.PORT || 3000

const MET = require('./met.js')

app.get('', function(req, res){
	
	res.send({
		greeting: 'Hola, bienvenid@ al Examen 2 de Ricardo Reyes A01281564',
		students: 'con el link /students/[Matricula], puede buscar mi matricula y recibir mi info',
		met : "con la ruta /met/?search=[Cosa] podra buscar objetos dentro del museo del MET",
		porfavor: 'Diviertase y pongame 100' 
	})


})


app.get('/students/:id', function(req,res){

	//console.log(req.params.id)
	if (req.params.id == "A01281564" )
	{
		res.send({
		 "id": req.params.id,
		 "fullname": "Ricardo Salomon Reyes Alcala",
		 "nickname": "PapaOso",
		 "age": 23
		})
	}
	else
	{
		res.send({
		 error: 'Esa matricula no la tengo guardada',
		 respuesta: "Solo tengo A01281564"
		})
	}

	
})

app.get('/students/', function(req,res){

	//console.log(req.params.id)
	
		res.send({
		 Landing: "Ya entro al sistema de busqueda de estudiantes",
		 Intenta: "Porfavor ponga una matricula despues del /",
		 solo: "Solo tengo en el sistema la matricula A01281564"
		})
	
})

app.get('/met', function(req,res)
{
	
	
	if (!req.query.search )
	{
		res.send({
		 Landing: "Ya entro al sistema de busqueda del met",
		 Intenta: "Porfavor ponga /met/?search=[cosa], y se buscara esa cosa dentro del MET"
		})
	}
	else
	{
		MET.met(req.query.search, function(error, response)
		{
			if(error != undefined)
			{
				res.send({
						error: error
					})
			}

			if(response == 0)
			{
				res.send({
						error: "No hubo resultados de esa busqueda"
					})

			}

			MET.metID(response, function(error,response)
			{

				if(error != undefined)
				{
					res.send({
						error: error
					})

				}
				else
				{
					res.send({
				  searchTerm: req.query.search,
				  artist : response.artist,
				  title: response.title,
				  year: response.year,
				  technique: response.technique,
				  metUrl: response.metUrl

				})

				}

			})
			
		})
	}
	
})



app.get('/bbcita', function(req, res){
	res.send({
		error: "Tu hombre te ama pero tu le eres infiel"
	})
})

app.get('*', function(req, res){
	res.send({
		error: "Ruta no valida"
	})
})

app.listen(port, function(){
	console.log('Comenzo este pez')
})