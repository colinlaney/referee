// var file = "arxivPhys2013_wos_idf_aggregated_cosine_concepts_level-5_experts_spec_BC_A_wos.json"
// d3.json(file, show_articles);

str='';

function contain(article, substr){
    substr = substr.toLowerCase()
    string = Object.keys(article['specialists']).toString() +
    Object.keys(article['experts']).toString() +
    article['arxiv_id'] +
    article['title'] +
    article['authors'] +
    Object.keys(article['specialists']).map(key => article['specialists'][key]).toString() +
    Object.keys(article['experts']).map(key => article['experts'][key]).toString()
    return string.toLowerCase().includes(substr)
}

function show_articles(articles){
    var articles = Object.keys(articles).filter(key => contain(articles[key], str)).map(key => articles[key]);
    // articles = Object.keys(articles).filter(key => Object.keys(articles[key]["authors"]).length < articles[key]["specialists"][Object.keys(articles[key]["specialists"])[0]][2] && Object.keys(articles[key]["authors"]).length > 1).map(key => articles[key]); // Filter out articles with len(authors) < 2 and len(authors) >= len(authors in a cluster)
    console.log(articles);
    // articles = articles.filter(function(d) {
        // var authors = d["authors"];
        // var keys = Object.keys(d["experts"]);
        // var experts = Object.keys(d["experts"]).slice(keys.length-5, keys.length);
        // var specs = experts.filter(spec => authors.some(auth => auth == spec));
        // return true;
        // //return specs.length;
    // });
    console.log(articles.length);
    var div = d3.select("#articles");
    var table = div.select("#articles_table");
    table.selectAll("th")
        .data(['Arxiv ID', 'Title', 'Authors in a cluster', 'Score', 'Specialists', 'Authors', 'Experts', 'h', 'Citations'])
        // .data(['Arxiv ID', 'Title', 'Authors in a cluster', 'Author\'s articles in a cluster', 'Score', 'Specialists', 'Authors', 'Experts', 'h', 'Citations'])
        .enter()
        .append("th")
        .style("border", "1px solid gray")
        .style("border-radius", "1px solid gray")
        .style("text-align", "center")
        .text(function(d){return d});
    table.select("tbody").remove();
    var tr = table.append("tbody").selectAll("tr")
        .data(articles)
        .enter()
        .append("tr");
    tr.append("td")
        .attr("id", (d, i) => "a_id_" + (i+1).toString())
        .text(d => d.arxiv_id);
    tr.append("td")
        .attr("id", (d, i) => "t_id_" + (i+1).toString())
        .html(d => d.into ? '<b>'+d.title+'</b>' : d.title);

    tr.append("td")
        .attr("id", function(d, i) {return "spec_id_" + (i+1).toString()})
        .attr("class", "authors")
        .text(d => d["specialists"][Object.keys(d["specialists"])[0]][2]);
    // tr.append("td")
    //     .attr("id", function(d, i) {return "publications_id_" + (i+1).toString()})
    //     .attr("class", "publications")
    //     .text(d => Object.keys(d["specialists"]).sort((a, b) => d["specialists"][a][0] < d["specialists"][b][0]).map(key => d["specialists"][key][1].toString()).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "score_id_" + (i+1).toString()})
        .attr("class", "score")
        .text(d => Object.keys(d["specialists"]).sort((a, b) => d["specialists"][a][0] < d["specialists"][b][0] ? 1 : d["specialists"][a][0] > d["specialists"][b][0] ? -1 : 0).slice(0, 5).map(key => d["specialists"][key][0].toString().slice(0, 8)).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "specialists_id_" + (i+1).toString()})
        .attr("class", "specialists")
        .html(d => Object.keys(d["specialists"]).sort((a, b) => d["specialists"][a][0] < d["specialists"][b][0] ? 1 : d["specialists"][a][0] > d["specialists"][b][0] ? -1 : 0).slice(0, 5).map(key => (d["authors"].indexOf(key) >= 0) ? '<b style="color:#0">'+key+'</b>' : key).join('\n').split('_').join(' '));

    tr.append("td")
        .attr("id", (d, i) => "auth_id_" + (i+1).toString())
        .attr("class", "authors")
        .html(d => Object.keys(d["authors"]).slice(0, 5).map(key => d["authors"][key]).join('\n').split('_').join(' '));

    tr.append("td")
        .attr("id", (d, i) => "experts_id_" + (i+1).toString())
        .attr("class", "experts")
        .html(d => Object.keys(d["experts"]).sort((a, b) => d["experts"][a][0] == d["experts"][b][0] ? d["experts"][a][1] < d["experts"][b][1] : d["experts"][a][0] < d["experts"][b][0]).map(key => key).join('\n').split('_').join(' '));
    tr.append("td")
        .attr("id", function(d, i) {return "h_id_" + (i+1).toString()})
        .attr("class", "h")
        .text(d => Object.keys(d["experts"]).sort((a, b) => d["experts"][a][0] == d["experts"][b][0] ? d["experts"][a][1] < d["experts"][b][1] : d["experts"][a][0] < d["experts"][b][0]).map(key => d["experts"][key][0].toString().slice(0, 6)).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "cit_id_" + (i+1).toString()})
        .attr("class", "citations")
        .text(d => Object.keys(d["experts"]).sort((a, b) => d["experts"][a][0] == d["experts"][b][0] ? d["experts"][a][1] < d["experts"][b][1] : d["experts"][a][0] < d["experts"][b][0]).map(key => d["experts"][key][1].toString().slice(0, 6)).join('\n'));
    }
