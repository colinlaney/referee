  function show_concepts_tfidf(dat){
    top_concepts_tfidf = dat.concepts_tfidf;
    if ( top_concepts_tfidf ){
        // console.log('tf', top_concepts_tfidf)
        var top_concepts_tfidf_ = Object.keys(top_concepts_tfidf).map(function(key){return node['concepts_id_to_concepts'][top_concepts_tfidf[key]]});    // ES6
        // var top_concepts_tfidf_ = Object.values(top_concepts_tfidf); // ES7

        var content = d3.select("#concepts");
        content.select("#concept_table").remove();
        var table = content.select("#concept_table");
        if(table[0][0] == null){
            table = content.append("table");
            table.transition()
                .duration(750);
            table.attr("id", "concept_table");
        // table.append("caption").text('Top TFIDF concepts');
        table.selectAll("th")
            .data(['Top TFIDF concepts'])
            .enter()
            .append("th")
            .style("border", "1px solid gray")
            .text(function(d){return d});
//        table.attr("style", "border:0px solid black");
        }
        table.style("opacity", 1);
        var tr = table.selectAll("tr")
            .data(top_concepts_tfidf_, function(d) {return d});

        tr.enter()
            .append("tr")
            .append("td")
            .attr("id", function(d, i) {return "tfidf_" + (i+1).toString()})
            .text(function(d) {return d})
            .style("opacity", 0)
            // .transition()
            //     .duration(750)
            .style("opacity", 1);
        tr.exit()
            // .transition()
            //     .duration(750)
            .style("opacity", 0)
            .remove();


        var eventChange = new CustomEvent('change', {'detail': dat});
        search.dispatchEvent(eventChange);
        var cluster_concept, article_concept;
        var rank = 0.;
        for (i = 1; i <= 20; i++) {
            cluster_concept = document.getElementById('tfidf_' + i).innerHTML;
            if (cluster_concept[0] == '<') {
                cluster_concept = cluster_concept.slice(21, cluster_concept.length-11);
                document.getElementById('tfidf_' + i).innerHTML = cluster_concept;
            }
            for (j = 1; j <= 20; j++) {
                article_concept = document.getElementById('concept_id_' + j) ? document.getElementById('concept_id_' + j).innerHTML : '';
                if (article_concept[0] == '<'){
                    // article_concept = article_concept.slice(21, article_concept.length-11);
                }
                if (article_concept == cluster_concept) {
                    document.getElementById('tfidf_' + i).innerHTML = '<b><font color="red">' + cluster_concept + '</font></b>';
                    // document.getElementById('concept_id_' + j).innerHTML = '<b><font color="red">' + article_concept + '</font></b>';
                    document.getElementById('concept_id_' + j).className = 'article_concept_highlight';
                    concepts_dict = article_heat[search.options[search.selectedIndex].value].vectors.tfidf[parents(dat)];
                    rank += concepts_dict[Object.keys(concepts_dict)[j]];
                }
            }
        }
        // console.log('rank', rank);
    } else {
        var content = d3.select("#concepts");
        content.select("#concept_table").remove();
    };
  }

  function show_concepts_df(dat){
    top_concepts_df = dat.concepts_dfidf;
    if ( top_concepts_df ){
        // console.log('df', top_concepts_tfidf)
        var top_concepts_df_ = Object.keys(top_concepts_df).map(function(key){return node['concepts_id_to_concepts'][top_concepts_df[key]]});    // ES6
        // var top_concepts_df_ = Object.values(top_concepts_df); // ES7

        var content = d3.select("#df-concepts");
        content.select("#df-concept_table").remove();
        var table = content.select("#df-concept_table");
        if(table[0][0] == null){
            table = content.append("table");
            // table.transition()
            //     .duration(750);
            table.attr("id", "df-concept_table");
        // table.append("caption").text('Top TFIDF concepts');
        table.selectAll("th")
            .data(['Top DF concepts'])
            .enter()
            .append("th")
            .style("border", "1px solid gray")
            .text(function(d){return d});
//        table.attr("style", "border:0px solid black");
        }
        table.style("opacity", 1);
        var tr = table.selectAll("tr")
            .data(top_concepts_df_, function(d) {return d});

        tr.enter()
            .append("tr")
            .append("td")
            .attr("id", function(d, i) {return "dfidf_" + (i+1).toString()})
            .text(function(d) {return d})
            .style("opacity", 0)
            // .transition()
            //     .duration(750)
            .style("opacity", 1);
        tr.exit()
            // .transition()
            //     .duration(750)
            .style("opacity", 0)
            .remove();


        // var eventChange = new CustomEvent('change', {'detail': dat});
        // search.dispatchEvent(eventChange);
        var cluster_concept, article_concept;
        var rank = 0.;
        for (i = 1; i <= 20; i++) {
            cluster_concept = document.getElementById('dfidf_' + i).innerHTML;
            if (cluster_concept[0] == '<') {
                cluster_concept = cluster_concept.slice(21, cluster_concept.length-11);
                document.getElementById('dfidf_' + i).innerHTML = cluster_concept;
            }
            for (j = 1; j <= 20; j++) {
                article_concept = document.getElementById('concept_id_' + j) ? document.getElementById('concept_id_' + j).innerHTML : '';
                // if (article_concept[0] == '<'){
                //     article_concept = article_concept.slice(21, article_concept.length-11);
                // }
                if (article_concept == cluster_concept) {
                    document.getElementById('dfidf_' + i).innerHTML = '<b><font color="red">' + cluster_concept + '</font></b>';
                    // document.getElementById('concept_id_' + j).innerHTML = '<b><font color="red">' + article_concept + '</font></b>';
                    document.getElementById('concept_id_' + j).className = 'article_concept_highlight';
                    concepts_dict = article_heat[search.options[search.selectedIndex].value].vectors.tfidf[parents(dat)];
                    rank += concepts_dict[Object.keys(concepts_dict)[j]];
                }
            }
        }
        // console.log('rank', rank);
    } else {
  		var content = d3.select("#df-concepts");
        content.select("#df-concept_table").remove();
	};
  }




  function show_articles(top_articles){
    if ( top_articles ){
        // var top_articles_ = Object.keys(top_articles).map(function(k) { return top_articles[k] });
        var top_articles_ = Object.keys(top_articles).map(function(key){return top_articles[key]});    // ES6
        // var top_articles_ = Object.values(top_articles); // ES7

        var footer = d3.select("#articles");
        footer.select("#article_table").remove();
        var table = footer.append("table");
        table.attr("id", "article_table");
        table.append("caption").text('Representative articles');
        table.selectAll("th")
            .data(['arxiv id', 'title', 'primary category'])
            .enter()
            .append("th")
            .style("border", "1px solid gray")
            .style("border-radius", "1px solid gray")
            .style("text-align", "center")
            .text(function(d){return d});
//        table.attr("style", "border:0px solid black");
        var tr = table.selectAll("tr")
            .data(top_articles_)
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
            .attr("class", "primary_category")
            .text(function(d) {return d.category});
        // tr.append("td")
        //     .attr("id", function(d, i) {return "cats_id_" + (i+1).toString()})
        //     .attr("class", "secondary_categories")
        //     .text(function(d) {return (d.categories).join('\n')});
        tr.style("opacity", 0)
            // .transition().duration(DURATION)
            .style("opacity", 1);
//        tr.style("background", function(d, i) {return i%2 ? "#fff" : "#eee"});
    } else {
        var footer = d3.select("#articles");
        footer.select("#article_table")
            .style("opacity", 1)
            // .transition()
            //     .duration(DURATION)
            .style("opacity", 0)
        .remove();
    };
  }



  function show_article(top_articles, cluster){
  	if ( top_articles ){
        // var top_articles_ = Object.keys(top_articles).map(function(k) { return top_articles[k] });
        // TODO: check the level coincidence
        var level = parents(cluster);//cluster > 0 ? top_articles.clusters.indexOf(cluster) : 0;
        // console.log(cluster, top_articles.clusters, top_articles.clusters.indexOf(cluster));
        var top_articles_ = Object.keys(top_articles.vectors.tfidf[level]).map(function(key){return key});    // ES6
        // var top_articles_ = Object.values(top_articles); // ES7

        var footer = d3.select("#article");
        footer.select("#article_details").remove();
        var table = footer.append("table");
        table.attr("id", "article_details");
        table.style("margin-left", "auto");
        table.style("margin-right", "auto");
        // table.append("caption").text('Article details');
        table.selectAll("th")
            .data(['arxiv id', 'authors', 'top concepts'])
            .enter()
            .append("th")
            .style("border", "1px solid gray")
            .style("border-radius", "1px solid gray")
            .style("text-align", "center")
            .text(function(d){return d});
//        table.attr("style", "border:0px solid black");
        var tr = table.selectAll("tr")
            .data(top_articles_)
            .enter()
            .append("tr");
        tr.append("td")
            .attr("id", function(d, i) {return "arxiv_id_" + (i+1).toString()})
            .html(function(d, i) {return i == 0 ? ('<a href="http://arxiv.org/abs/' + top_articles.arxiv_id + '">' + top_articles.arxiv_id + '</a>') : ""});
        // tr.append("td")
        //     .attr("id", function(d, i) {return "title_id_" + (i+1).toString()})
        //     .text(function(d, i) {return i == 10 ? top_articles.title : ""});
        tr.append("td")
            .attr("id", function(d, i) {return "author_id_" + (i+1).toString()})
            .html(function(d, i) {return '<a href="http://arxiv.org/find/all/1/all:+' + top_articles.authors[i] + '/0/1/0/all/0/1">' + ((top_articles.authors[i]) ? top_articles.authors[i].split('_').join(' ') : '') + '</a>'});
        tr.append("td")
            .attr("id", function(d, i) {return "concept_id_" + (i+1).toString()})
            // .attr("class", "article_concepts")
            .text(function(d) {return node['concepts_id_to_concepts'][d]});
        // tr.append("td")
        //     .attr("id", function(d, i) {return "cats_id_" + (i+1).toString()})
        //     .attr("class", "secondary_categories")
        //     .text(function(d) {return (d.categories).join('\n')});
        tr.style("opacity", 0)
            // .transition().duration(DURATION)
            .style("opacity", 1);
//        tr.style("background", function(d, i) {return i%2 ? "#fff" : "#eee"});
	} else {
        var footer = d3.select("#articles");
        footer.select("#article_details")
            .style("opacity", 1)
            // .transition()
            //     .duration(DURATION)
            .style("opacity", 0)
        .remove();
    };
  }
