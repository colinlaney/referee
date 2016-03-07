var filespec = "arxivPhys2013_wos_idf_aggregated_cosine_concepts_level-2_subcluster_1of7_cluster-1of6.json"

d3.json(filespec, show_articles);

function show_articles(articles){
    var articles = Object.keys(articles).map(key => articles[key]);
    console.log(articles);
    articles = articles.filter(function(d) {
        var authors = d["authors"];
        var specs = Array(d["specialists"]).filter(auth => auth[Object.keys(auth)[9]][1] >= 5);
        // specs = Array(d["specialists"]).filter(auth => Object.keys(auth).map(key => auth[key][1]).every(a => a >= 5));
        return specs.length;
    });
    console.log(articles.length);
    var div = d3.select("#articles");
    div.select("#article_table").remove();
    var table = div.append("table");
    table.attr("id", "article_table");
    table.append("caption").html('<h1>Potential referees for the articles</h1>');
    table.selectAll("th")
        .data(['Arxiv ID', 'Title', 'Specialists', 'Score', '#Publications', '#Authors'])
        .enter()
        .append("th")
        .style("border", "1px solid gray")
        .style("border-radius", "1px solid gray")
        .style("text-align", "center")
        .text(function(d){return d});
    var tr = table.append('tbody').selectAll("tr")
        .data(articles)
        .enter()
        .append("tr");
    tr.append("td")
        .attr("id", (d, i) => "a_id_" + (i+1).toString())
        .text(d => d.arxiv_id);
    tr.append("td")
        .attr("id", (d, i) => "t_id_" + (i+1).toString())
        .text(d => d.title);
    tr.append("td")
        .attr("id", (d, i) => "spec_id_" + (i+1).toString())
        .attr("class", "specialists")
        .html(d => Object.keys(d["specialists"]).reverse().map(key => (d["authors"].indexOf(key) >= 0) ? '<b style="color:#0">'+key+'</b>' : key).join('\n').split('_').join(' '));
    tr.append("td")
        .attr("id", function(d, i) {return "score_id_" + (i+1).toString()})
        .attr("class", "score")
        .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][0].toString().slice(0, 6)).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "pub_num_" + (i+1).toString()})
        .attr("class", "publications")
        .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][1].toString()).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "auth_num_" + (i+1).toString()})
        .attr("class", "authors")
        .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][2].toString())[0]);
    }
