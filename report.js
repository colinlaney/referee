var filespec = "arxivPhys2013_wos_idf_aggregated_cosine_concepts_level-3_experts_spec.json"

d3.json(filespec, show_articles);

function show_articles(articles){
    var articles = Object.keys(articles).map(key => articles[key]);
    console.log(articles);
    articles = articles.filter(function(d) {
        var authors = d["authors"];
        var keys = Object.keys(d["experts"]);
        var experts = Object.keys(d["experts"]).slice(keys.length-5, keys.length);
        var specs = experts.filter(spec => authors.some(auth => auth == spec));
        return true;
        //return specs.length;
    });
    console.log(articles.length);
    var div = d3.select("#articles");
    div.select("#article_table").remove();
    var table = div.append("table");
    table.attr("id", "article_table");
    table.append("caption").html('<h1>Potential referees for the articles</h1>');
    table.selectAll("th")
        // .data(['Arxiv ID', 'Title', 'Specialists', 'Score', '#Publications', '#Authors'])
        .data(['Arxiv ID', 'Title', 'Score', 'Specialists', 'Experts', 'h', 'Citations'])
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
        .attr("id", function(d, i) {return "score_id_" + (i+1).toString()})
        .attr("class", "score")
        .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][0].toString().slice(0, 6)).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "specialists_id_" + (i+1).toString()})
        .attr("class", "specialists")
        .html(d => Object.keys(d["specialists"]).reverse().map(key => (d["authors"].indexOf(key) >= 0) ? '<b style="color:#0">'+key+'</b>' : key).join('\n').split('_').join(' '));
    tr.append("td")
        .attr("id", (d, i) => "experts_id_" + (i+1).toString())
        .attr("class", "experts")
        .html(d => Object.keys(d["experts"]).map(key => key).join('\n').split('_').join(' '));
    tr.append("td")
        .attr("id", function(d, i) {return "h_id_" + (i+1).toString()})
        .attr("class", "h")
        .text(d => Object.keys(d["experts"]).map(key => d["experts"][key][0].toString().slice(0, 6)).join('\n'));
    tr.append("td")
        .attr("id", function(d, i) {return "cit_id_" + (i+1).toString()})
        .attr("class", "citations")
        .text(d => Object.keys(d["experts"]).map(key => d["experts"][key][1].toString().slice(0, 6)).join('\n'));
        // .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][0].toString().slice(0, 6)).join('\n'));
    // tr.append("td")
    //     .attr("id", function(d, i) {return "pub_num_" + (i+1).toString()})
    //     .attr("class", "publications")
    //     .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][1].toString()).join('\n'));
    // tr.append("td")
    //     .attr("id", function(d, i) {return "auth_num_" + (i+1).toString()})
    //     .attr("class", "authors")
    //     .text(d => Object.keys(d["specialists"]).reverse().map(key => d["specialists"][key][2].toString())[0]);
    }
