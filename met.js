
const request = require('request')

//Link = 'https://collectionapi.metmuseum.org/public/collection/v1/search'

const met = function(busqueda, callback)
{
	//console.log(title)

	url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+ busqueda

	request({url, json: true}, function(error, response) 
	{ 
		if(error)
		{
			callback(error, undefined)
		}
		else
		{

			const data = response.body

			if(data.Response == 'False')
			{
				callback(data.Error, undefined)
			}
			else
			{	
				//console.log(data)
				if(data.objectIDs == undefined)
				{
					callback(undefined, 0)
				}

				callback(undefined, data.objectIDs[0])
			}
		}
	})

}

const metID = function(ID, callback)
{
	//console.log(title)

	url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+ ID

	request({url, json: true}, function(error, response) 
	{ 
		if(error)
		{
			callback(error, undefined)
		}
		else
		{
			data = response.body

			if(data.Response == 'False')
			{
				callback(data.Error, undefined)
			}
			else
			{	
				

				const info = {
				artist : data.constituents[0].name,
				title: data.title,
				year: data.objectEndDate,
				technique: data.medium,
				metUrl: data.objectURL
				}

				//console.log(info)

				callback(undefined, info)
			}
		}
	})

}


module.exports = {
	met  : met,
	metID  : metID
}
