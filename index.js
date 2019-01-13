const axios = require('axios')
const { parse } = require('node-html-parser')

const wikiApi = axios.create({
  baseURL: 'https://en.wikipedia.org/w/api.php',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

wikiApi.get('', {
  params: {
    action: "parse",
    page: "List_of_countries_by_population_(United_Nations)",
    format: "json"
  }
})
  .then(response => {
    let content = response.data.parse.text['*'].replace(/\n/g, '');
    let root = parse(content)
    // console.log(root.querySelector('.wikitable').childNodes.length)
    // console.log(root.querySelectorAll('.wikitable tbody tr')[22].toString())
    // console.log(root.querySelectorAll('.wikitable tbody tr')[23].childNodes[1].toString())
    // console.log(root.querySelectorAll('.wikitable tbody tr')[23].childNodes[1].querySelector('a').attributes)

    let $rows = root.querySelectorAll('.wikitable tbody tr')

    for (let i = 0; i < $rows.length; i++) {
      if ($rows[i].childNodes[1].querySelector('a')) {
        console.log(
          $rows[i].childNodes[1].querySelector('a').attributes.title, 
          $rows[i].childNodes[1].querySelector('a').attributes.href, 
          $rows[i].childNodes[5].childNodes[0].toString()
        )
      }
    }
  })
  .catch(console.log)