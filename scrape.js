axios = require('axios')


axios('http://localhost:9000/blog/API/').then(
    res => {
        let chunk = res.data.split('<div class="data">')[1];
        let chunkette = chunk.split('</div>')[0];
        let slug = chunkette.split('slug&quot;:&quot;');
        let title = chunkette.split('title');
        let desc = chunkette.split('description&quot;: &quot;');
        let image = chunkette.split('image&quot;: &quot;')

        console.log(slug)
        console.log(title)
        console.log(desc)
        console.log(image)
    }

)