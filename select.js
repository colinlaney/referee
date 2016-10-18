// var filename is declared in treemap.js
// var search_filename = filename.substring(0, filename.lastIndexOf('.')+1) + "concepts.json";
var search_filename = "visual/arxiv2010-2015_wos_clusters_of_articles+truncated_vectors_and_float+specialists.json";
// var search_filename = "visual/arxiv2010-2015_wos_experts_0_all.json";


var generalists_list = Array();

function callback(json) {
    generalists_list.push(json[Object.keys(json)[0]]);
    console.log(Object.keys(json), generalists_list);
}

for(var i = 0; i <=5; i++) {
  d3.json("visual/arxiv2010-2015_wos_experts_" + String(i) + "_all.json", function(json){callback(json)})
}

console.log('------------', generalists_list)


var article_heat = Object();



d3.json(search_filename, function(json) {
  Object.keys(json['articles']).map(function(a) {
    article_heat[a.toLowerCase()] = json['articles'][a];
  });
  var search = document.getElementById('search');
  search.addEventListener('change', heatmap);
  // event 'input' is also dispatched from treemap.js display() transition()

  d3.select("#search")
    .selectAll("option")
      .data(Object.keys(json['articles']))
      .enter().append("option")
      .attr("value", function(a) {return a})
      .text(function(a) {return json['articles'][a]['title']})

  var eventChange = new CustomEvent('change');
  search.dispatchEvent(eventChange);
  // showChildHistogram(node.children[article_heat[search.options[search.selectedIndex].value]['clusters'][0]]);
  var article = article_heat[search.options[search.selectedIndex].value];
  var clusters = article['clusters'];
  var level = document.getElementById("level").innerHTML.split(' ')[1];
  // if (node) {
  //   showParentHistogram(node.children[clusters[level]]);
  // }

  function heatmap(e) {
    if(article_heat[search.options[search.selectedIndex].value] != undefined) {
      d3.selectAll('.parent')
        .style('fill', '#bbb')
        .style('fill-opacity', 0.5);
      d3.selectAll('.child')
        .style('fill', '#bbb')
        .style('fill-opacity', 0.5);

      article_heat[search.options[search.selectedIndex].value]['clusters'].forEach(function(cluster) {
      d3.select('#id' + cluster)
        .style('fill', '#e66')
        .style('fill-opacity', 0.5);
      });

      var article = article_heat[search.options[search.selectedIndex].value];
      var clusters = article['clusters'];
      var level = document.getElementById("level").innerHTML.split(' ')[1];
      show_article(article_heat[search.options[search.selectedIndex].value], e ? (e.detail ? e.detail : (node ? node.children[clusters[level]] : 0)) : (node ? node.children[clusters[level]] : 0));
      show_referee(article_heat[search.options[search.selectedIndex].value], e ? (e.detail ? e.detail : (node ? node.children[clusters[level]] : 0)) : (node ? node.children[clusters[level]] : 0));
    } else {
      d3.selectAll('.parent')
        .style('fill', '#bbb')
        .style('fill-opacity', 0.5);
      d3.selectAll('.child')
        .style('fill', '#bbb')
        .style('fill-opacity', 0.5);
    }
  }
});