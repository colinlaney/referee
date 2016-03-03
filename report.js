var filespec = "BC_A_wos_idf_combined_cosine_concepts.json"

d3.json(filespec, show_articles);

function show_articles(specialists){
    var specialists = Object.keys(specialists).map(key => specialists[key]);
    var div = d3.select("#articles");
    div.select("#article_table").remove();
    var table = div.append("table");
    table.attr("id", "article_table");
    table.append("caption").html('<h1>Potential referees for the articles</h1>');
    table.selectAll("th")
        .data(['Arxiv ID', 'Title', 'Score', 'Specialists'])
        .enter()
        .append("th")
        .style("border", "1px solid gray")
        .style("border-radius", "1px solid gray")
        .style("text-align", "center")
        .text(function(d){return d});
    var tr = table.append('tbody').selectAll("tr")
        .data(specialists)
        .enter()
        .append("tr");
    tr.append("td")
        .attr("id", function(d, i) {return "a_id_" + (i+1).toString()})
        .text(function(d) {return d.arxiv_id});
    tr.append("td")
        .attr("id", function(d, i) {return "t_id_" + (i+1).toString()})
        .text(function(d) {return d.title});
    tr.append("td")
        .attr("id", function(d, i) {return "cat_id_" + (i+1).toString()})
        .attr("class", "score")
        .text(function(d) {
            var score = Array();
            for(var key in d["specialists"]) {
                var value = d["specialists"][key];
                score.push(value.toString().slice(0, 6));
            }
            return Object.keys(d["specialists"]).map(key => d["specialists"][key].toString().slice(0, 6)).reverse().join('\n')
            // return score.reverse().join('\n');
        });
    tr.append("td")
        .attr("id", function(d, i) {return "cats_id_" + (i+1).toString()})
        .attr("class", "specialists")
        .html(function(d) {
                return Object.keys(d["specialists"]).map(key => (d["authors"].indexOf(key) >= 0) ? '<b style="color:#0">'+key+'</b>' : key).reverse().join('\n').split('_').join(' ');
        });
    }
