//hw mean
var getGrade = function(hw)
{return hw.grade};
var meanHW = function(peng)
{return d3.mean(peng.homework.map(getGrade))};

//final grade
var getGrade = function(f)
{return f.grade};
var getFinal = function(peng)
{return (peng.final.map(getGrade))};

//images
var getImage = function(student)
{return "../imgs" + student.picture};

//defining draw plot
var drawPlot = function(table, screen, xScale, yScale)
{
    
    d3.select("#graph")
    .selectAll("circle")
    .data(table)
    .enter()
    .append("circle")
    .attr("fill", "black")
    .attr("cx", function(table)
    {
        return xScale(getFinal(table));
    })
    .attr("cy", function(table)
    {
        return yScale(meanHW(table));
    })
    .attr("r", 3)
    
    
    .on("mouseenter", function(table)
    {
    console.log("hovering");
        
    var xPos = d3.event.pageX;
    var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden", false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        
        //d3.select("#f")
        //.text(table.name);
        
        d3.select("#hw")
        .append("img")
        .attr("src", function(penguin)
        {return getImage(penguin)});
        

                
        
    })
    
}

//initializing graph
var initgrapgh = function(table)
{
    var screen = {width:400, height:400}
    
    d3.select("#graph")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
    var xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, screen.width])
    
    var yScale = d3.scaleLinear()
        .domain([0, 50])
        .range([screen.height, 0])
    
    //draw plot
    drawPlot(table, screen, xScale, yScale);
};


//promise
var penguinPromise = d3.json("../classData.json")

//succes function
var successFCN = function(table)
{
console.log("Data collected", table);

initgrapgh(table);


}
    
//fail function
var failFCN = function(errorMsg)
{console.log("Something went wrong", errorMsg);}

penguinPromise.then(successFCN, failFCN);


