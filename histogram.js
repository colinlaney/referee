/*jslint undef: true */
function showHistogram(dat, div) {
    const LABEL_HEIGHT = 12;    // const->var when ESv < ES6
    const LABEL_WIDTH = 50;
    var HIST_WIDTH = d3.select("body").property("offsetWidth") / 5;
    const LABEL_INDENT = 5;
    const HIST_MARGIN_V = 30;

    dat = Object.keys(dat).map(function(key){return {x: key, y: dat[key]}});
    dat.sort(function(a, b) {return a.x >= b.x ? 1 : -1});
    var flex = d3.select('#' + div)
    flex.select("svg").remove();
    var svgHist = flex.append("svg")
        // .attr("width", HIST_WIDTH)
        .attr("height", LABEL_HEIGHT * Object.keys(dat).length + HIST_MARGIN_V)
        .append("g");
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, LABEL_HEIGHT * Object.keys(dat).length]);

    yValues = dat.map(function(v){return v.y});
    yValues = [0, d3.max(yValues)];
    var y = d3.scale.linear().range([0, HIST_WIDTH - LABEL_WIDTH - LABEL_INDENT*2]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("left");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("top")
        .ticks(5);

    x.domain(dat.map(function(v){return v.x}));
    y.domain(yValues);

    svgHist.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + Number(LABEL_WIDTH + LABEL_INDENT) + ",0)")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end");

    svgHist.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + Number(LABEL_WIDTH + LABEL_INDENT) + ",0)")
      .call(yAxis)
    .append("text")
      .attr("class", "axisLabel")
      .attr("y", -HIST_MARGIN_V)
      .attr("x", (HIST_WIDTH - LABEL_WIDTH - LABEL_INDENT*2) / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Articles per " + div);

    svgHist.selectAll(".bar")
      .data(dat.map(function(key){return key.y}))
    .enter().append("rect")
      .on("mouseenter", function(d){
        var id = this.parentNode.parentNode.parentNode.id;
        d3.select("#" + id + " .axisLabel")
          .text(d + " articles per " + id);
      })
      .on("mouseleave", function(d){
        var id = this.parentNode.parentNode.parentNode.id;
        d3.select("#" + id + " .axisLabel")
          .text("Articles per " + id);
      })
      .attr("class", "bar")
      .attr("y", function(d,i) { return 1+i*LABEL_HEIGHT })
      .attr("height", LABEL_HEIGHT - 0)
      .attr("x", LABEL_WIDTH + LABEL_INDENT)
      .attr("width", function(d) { return d / Math.max(...yValues) * (HIST_WIDTH - LABEL_WIDTH - LABEL_INDENT*2) + 1 });
    svgHist.attr("transform", "translate(0," + HIST_MARGIN_V + ")");
  }

function showSubHistogram(dat, div) {
    const LABEL_HEIGHT = 4;    // const->var when ESv < ES6
    const LABEL_WIDTH = 0;
    var HIST_WIDTH = d3.select("body").property("offsetWidth") / 5;
    const LABEL_INDENT = 5;
    const HIST_MARGIN_V = 30;

    dat = Object.keys(dat).map(function(key){return {x: key, y: dat[key]}});
    dat.sort(function(a, b) {return a.x >= b.x ? 1 : -1});
    var flex = d3.select('#' + div)
    flex.select("svg").remove();
    var svgHist = flex.append("svg")
        // .attr("width", HIST_WIDTH)
        .attr("height", LABEL_HEIGHT * Object.keys(dat).length + HIST_MARGIN_V)
        .append("g");
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, LABEL_HEIGHT * Object.keys(dat).length]);

    yValues = dat.map(function(v){return v.y});
    yValues = [0, d3.max(yValues)];
    var y = d3.scale.linear().range([0, HIST_WIDTH - LABEL_WIDTH - LABEL_INDENT*2]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("left");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("top")
        .ticks(5);

    x.domain(dat.map(function(v){return v.x}));
    y.domain(yValues);

    var winners = [];
    dat.forEach(function(winner) {winners.push([winner.x, winner.y])});
    winners.sort(function(a, b) {return b[1] - a[1]});

    svgHist.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + Number(LABEL_WIDTH + LABEL_INDENT) + ",0)")
      .call(yAxis)
    .append("text")
      .attr("class", "axisLabel")
      .attr("y", -HIST_MARGIN_V)
      .attr("x", (HIST_WIDTH - LABEL_WIDTH - LABEL_INDENT*2) / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      // .text("Articles per " + div);
      .text(winners[0][0]);

    svgHist.selectAll(".bar")
      .data(dat.map(function(key){return key.y}))
    .enter().append("rect")
      .on("mouseenter", function(d, i){
        var id = this.parentNode.parentNode.parentNode.id;
        d3.select("#" + id + " .axisLabel")
          .text(d + " / " + dat[i].x);
      })
      .on("mouseleave", function(d){
        var id = this.parentNode.parentNode.parentNode.id;
        d3.select("#" + id + " .axisLabel")
          // .text("Articles per " + id);
          .text(winners[0][0]);
      })
      .attr("class", "bar")
      .attr("y", function(d,i) { return 1+i*LABEL_HEIGHT })
      .attr("height", LABEL_HEIGHT)
      .attr("x", LABEL_WIDTH + LABEL_INDENT)
      .attr("width", function(d) { return d / Math.max(...yValues) * (HIST_WIDTH - LABEL_WIDTH - LABEL_INDENT*2) + 1 });
    svgHist.attr("transform", "translate(0," + HIST_MARGIN_V + ")");
  }

  function getRootCategoriesFrequency(d) {
    var rootCategoriesFrequency = {};
    function getGrandparent(cluster) {return cluster.parent ? getGrandparent(cluster.parent) : cluster};

    Object.keys(getGrandparent(d).categories_frequency)
        .forEach(function(key) {
            rootCategoriesFrequency[key.substring(0, key.indexOf('.')) || key] =
            (rootCategoriesFrequency[key.substring(0, key.indexOf('.')) || key] || 0) + (d.categories_frequency[key] || 0);
        });
    return rootCategoriesFrequency;
  }

  function showLevelHistogram(d, emitter) {
    if(d3.select(emitter).style("fill") == "rgb(187, 187, 187)") {
        showParentHistogram(d);
        // updateBreadcrumbs(getAncestors(d.parent));
    } else {
        showChildHistogram(d);
        // updateBreadcrumbs(getAncestors(d));
    }
  }


  function showParentHistogram(d) {
    if(!d.parent) return;
    d = d.parent;
    var cat = new Object();
    // node.list_categories.forEach(function(c, i) {
    //   cat[c] = d.cat[i] ? d.cat[i] : 0
    // });
    // var sub_cat = new Object();
    // node.list_subcategories.forEach(function(c, i) {
    //   sub_cat[c] = d.sub_cat[i] ? d.sub_cat[i] : 0
    // });
    // Object.keys(d.sub_cat).map(function(i) {
    //   sub_cat[node.list_subcategories[i]] = d.sub_cat[i]
    // });

    // showHistogram(cat, "category");
    // showSubHistogram(sub_cat, "subcategory");
    // show_articles(d.articles);
    show_concepts_tfidf(d);
    show_concepts_df(d);
  }


  function showChildHistogram(d) {
    if(!d) return;
    var cat = new Object();
    // node.list_categories.forEach(function(c, i) {
    //   cat[c] = d.cat[i] ? d.cat[i] : 0
    // });
    // var sub_cat = new Object();
    // node.list_subcategories.forEach(function(c, i) {
    //   sub_cat[c] = d.sub_cat[i] ? d.sub_cat[i] : 0
    // });
    // Object.keys(d.sub_cat).map(function(i) {
    //   sub_cat[node.list_subcategories[i]] = d.sub_cat[i]
    // });

    // showHistogram(cat, "category");
    // showSubHistogram(sub_cat, "subcategory");
    // show_articles(d.articles);
    show_concepts_tfidf(d);
    show_concepts_df(d);
  }
