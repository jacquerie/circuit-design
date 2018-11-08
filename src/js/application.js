class Graph {
  constructor(links, nodes) {
    this.links = links;
    this.nodes = nodes;
  }

  doesIntersect(link1) {
    for (const link2 of this.links) {
      if (link1.source === link2.source && link1.target === link2.target) {
        continue;
      } else if (this._doIntersect(link1, link2)) {
        return true;
      }
    }

    return false;
  }

  _doIntersect(link1, link2) {
    const p1 = this.nodes[link1.source];
    const q1 = this.nodes[link1.target];
    const p2 = this.nodes[link2.source];
    const q2 = this.nodes[link2.target];

    return Graph._segmentsIntersect(p1, q1, p2, q2);
  }

  static _segmentsIntersect(p1, q1, p2, q2) {
    const r1 = {'x': q1.x - p1.x, 'y': q1.y - p1.y};
    const r2 = {'x': q2.x - p2.x, 'y': q2.y - p2.y};

    const r = (-r2.x * r1.y + r1.x * r2.y);
    const s = (-r1.y * (p1.x - p2.x) + r1.x * (p1.y - p2.y)) / r;
    const t = ( r2.x * (p1.y - p2.y) - r2.y * (p1.x - p2.x)) / r;

    return 0 < s && s < 1 && 0 < t && t < 1;
  }

  swap(node1, node2) {
    var i, j; // eslint-disable-line no-var, one-var
    for (let k = 0; k < this.nodes.length; k++) {
      const node = this.nodes[k];
      if (node.x === node1.x && node.y === node1.y) {
        i = k;
      } else if (node.x === node2.x && node.y === node2.y) {
        j = k;
      }
    }

    const nodes = this.nodes.slice();
    [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
    this.nodes = nodes;
  }
}

const GRAPHS = [
  new Graph([
    {'source': 0, 'target': 2},
    {'source': 0, 'target': 3},
    {'source': 1, 'target': 2},
    {'source': 1, 'target': 3},
  ], [
    {'x': 95, 'y': 85},
    {'x': 475, 'y': 85},
    {'x': 475, 'y': 465},
    {'x': 95, 'y': 465},
  ]),
  new Graph([
    {'source': 0, 'target': 1},
    {'source': 1, 'target': 2},
    {'source': 2, 'target': 4},
    {'source': 3, 'target': 0},
    {'source': 3, 'target': 4},
  ], [
    {'x': 285, 'y': 85},
    {'x': 104, 'y': 216},
    {'x': 173, 'y': 429},
    {'x': 397, 'y': 429},
    {'x': 466, 'y': 215},
  ]),
  new Graph([
    {'source': 0, 'target': 2},
    {'source': 0, 'target': 3},
    {'source': 1, 'target': 3},
    {'source': 1, 'target': 4},
    {'source': 2, 'target': 5},
    {'source': 4, 'target': 5},
  ], [
    {'x': 380, 'y': 110},
    {'x': 190, 'y': 110},
    {'x': 95, 'y': 275},
    {'x': 190, 'y': 440},
    {'x': 380, 'y': 440},
    {'x': 475, 'y': 275},
  ]),
  new Graph([
    {'source': 0, 'target': 1},
    {'source': 0, 'target': 7},
    {'source': 1, 'target': 6},
    {'source': 1, 'target': 8},
    {'source': 2, 'target': 3},
    {'source': 2, 'target': 8},
    {'source': 2, 'target': 6},
    {'source': 3, 'target': 4},
    {'source': 4, 'target': 5},
    {'source': 4, 'target': 6},
    {'source': 5, 'target': 7},
    {'source': 6, 'target': 7},
  ], [
    {'x': 95, 'y': 85},
    {'x': 285, 'y': 85},
    {'x': 465, 'y': 85},
    {'x': 95, 'y': 275},
    {'x': 285, 'y': 275},
    {'x': 465, 'y': 275},
    {'x': 85, 'y': 465},
    {'x': 285, 'y': 465},
    {'x': 465, 'y': 465},
  ]),
  new Graph([
    {'source': 0, 'target': 6},
    {'source': 0, 'target': 7},
    {'source': 1, 'target': 4},
    {'source': 1, 'target': 7},
    {'source': 2, 'target': 3},
    {'source': 2, 'target': 5},
    {'source': 3, 'target': 9},
    {'source': 4, 'target': 6},
    {'source': 5, 'target': 8},
    {'source': 8, 'target': 9},
  ], [
    {'x': 285, 'y': 180},
    {'x': 195, 'y': 246},
    {'x': 229, 'y': 352},
    {'x': 341, 'y': 352},
    {'x': 375, 'y': 246},
    {'x': 285, 'y': 85},
    {'x': 104, 'y': 216},
    {'x': 173, 'y': 429},
    {'x': 397, 'y': 429},
    {'x': 466, 'y': 216},
  ]),
  new Graph([
    {'source': 0, 'target': 6},
    {'source': 0, 'target': 8},
    {'source': 1, 'target': 2},
    {'source': 1, 'target': 9},
    {'source': 2, 'target': 6},
    {'source': 3, 'target': 4},
    {'source': 3, 'target': 5},
    {'source': 4, 'target': 9},
    {'source': 5, 'target': 7},
    {'source': 7, 'target': 8},
  ], [
    {'x': 344, 'y': 94},
    {'x': 226, 'y': 94},
    {'x': 131, 'y': 163},
    {'x': 95, 'y': 275},
    {'x': 131, 'y': 387},
    {'x': 226, 'y': 456},
    {'x': 344, 'y': 456},
    {'x': 439, 'y': 387},
    {'x': 475, 'y': 275},
    {'x': 439, 'y': 163},
  ]),
  new Graph([
    {'source': 0, 'target': 5},
    {'source': 0, 'target': 7},
    {'source': 1, 'target': 2},
    {'source': 1, 'target': 10},
    {'source': 2, 'target': 4},
    {'source': 3, 'target': 9},
    {'source': 3, 'target': 8},
    {'source': 4, 'target': 10},
    {'source': 5, 'target': 6},
    {'source': 6, 'target': 11},
    {'source': 7, 'target': 9},
    {'source': 8, 'target': 11},
  ], [
    {'x': 375, 'y': 185},
    {'x': 195, 'y': 185},
    {'x': 195, 'y': 365},
    {'x': 375, 'y': 365},
    {'x': 358, 'y': 99},
    {'x': 212, 'y': 99},
    {'x': 109, 'y': 202},
    {'x': 109, 'y': 348},
    {'x': 358, 'y': 451},
    {'x': 212, 'y': 451},
    {'x': 461, 'y': 348},
    {'x': 461, 'y': 202},
  ]),
  new Graph([
    {'source': 0, 'target': 2},
    {'source': 0, 'target': 3},
    {'source': 0, 'target': 4},
    {'source': 1, 'target': 3},
    {'source': 1, 'target': 4},
    {'source': 2, 'target': 5},
    {'source': 2, 'target': 6},
    {'source': 3, 'target': 5},
    {'source': 4, 'target': 6},
    {'source': 5, 'target': 6},
  ], [
    {'x': 285, 'y': 180},
    {'x': 203, 'y': 323},
    {'x': 367, 'y': 323},
    {'x': 95, 'y': 85},
    {'x': 475, 'y': 85},
    {'x': 475, 'y': 465},
    {'x': 95, 'y': 465},
  ]),
  new Graph([
    {'source': 0, 'target': 4},
    {'source': 0, 'target': 11},
    {'source': 1, 'target': 8},
    {'source': 1, 'target': 15},
    {'source': 2, 'target': 6},
    {'source': 2, 'target': 9},
    {'source': 3, 'target': 10},
    {'source': 3, 'target': 14},
    {'source': 4, 'target': 5},
    {'source': 5, 'target': 14},
    {'source': 6, 'target': 7},
    {'source': 7, 'target': 13},
    {'source': 8, 'target': 10},
    {'source': 9, 'target': 12},
    {'source': 11, 'target': 13},
    {'source': 12, 'target': 15},
  ], [
    {'x': 322, 'y': 89},
    {'x': 248, 'y': 89},
    {'x': 179, 'y': 117},
    {'x': 127, 'y': 169},
    {'x': 99, 'y': 238},
    {'x': 99, 'y': 312},
    {'x': 127, 'y': 381},
    {'x': 179, 'y': 433},
    {'x': 248, 'y': 461},
    {'x': 322, 'y': 461},
    {'x': 391, 'y': 433},
    {'x': 443, 'y': 381},
    {'x': 471, 'y': 312},
    {'x': 471, 'y': 238},
    {'x': 443, 'y': 169},
    {'x': 391, 'y': 117},
  ]),
  new Graph([
    {'source': 0, 'target': 6},
    {'source': 0, 'target': 10},
    {'source': 0, 'target': 12},
    {'source': 1, 'target': 11},
    {'source': 1, 'target': 15},
    {'source': 2, 'target': 3},
    {'source': 2, 'target': 11},
    {'source': 2, 'target': 12},
    {'source': 2, 'target': 15},
    {'source': 3, 'target': 4},
    {'source': 3, 'target': 8},
    {'source': 3, 'target': 13},
    {'source': 4, 'target': 6},
    {'source': 4, 'target': 12},
    {'source': 4, 'target': 14},
    {'source': 5, 'target': 8},
    {'source': 5, 'target': 13},
    {'source': 6, 'target': 7},
    {'source': 7, 'target': 14},
    {'source': 8, 'target': 14},
    {'source': 9, 'target': 10},
    {'source': 9, 'target': 11},
    {'source': 9, 'target': 12},
    {'source': 13, 'target': 15},
  ], [
    {'x': 84, 'y': 94},
    {'x': 211, 'y': 94},
    {'x': 338, 'y': 94},
    {'x': 465, 'y': 94},
    {'x': 84, 'y': 221},
    {'x': 211, 'y': 221},
    {'x': 338, 'y': 221},
    {'x': 465, 'y': 221},
    {'x': 84, 'y': 348},
    {'x': 211, 'y': 348},
    {'x': 338, 'y': 348},
    {'x': 465, 'y': 348},
    {'x': 84, 'y': 475},
    {'x': 211, 'y': 475},
    {'x': 338, 'y': 475},
    {'x': 465, 'y': 475},
  ]),
];

class Game {
  constructor(width, height) {
    this.graphs = GRAPHS;
    this.svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

    this.currentLevel = 0;
    this.currentGraph = this.graphs[this.currentLevel];
    this.draw();
  }

  draw() {
    const that = this;

    that.svg.selectAll('.link')
        .data(that.currentGraph.links)
        .enter().append('line')
        .classed('link', true)
        .classed('intersect', function(link) {
          return that.currentGraph.doesIntersect(link);
        })
        .attr('x1', function(link) {
          return that.currentGraph.nodes[link.source].x;
        })
        .attr('y1', function(link) {
          return that.currentGraph.nodes[link.source].y;
        })
        .attr('x2', function(link) {
          return that.currentGraph.nodes[link.target].x;
        })
        .attr('y2', function(link) {
          return that.currentGraph.nodes[link.target].y;
        });
    that.svg.selectAll('.node')
        .data(that.currentGraph.nodes)
        .enter().append('circle')
        .classed('node', true)
        .attr('r', 16)
        .attr('cx', function(node) {
          return node.x;
        })
        .attr('cy', function(node) {
          return node.y;
        })
        .on('click', function() {
          /* eslint-disable no-invalid-this */
          d3.select(this).classed(
              'selected', !d3.select(this).classed('selected'));
          /* eslint-enable no-invalid-this */

          const selectedNodes = d3.selectAll('.node.selected').nodes();

          if (selectedNodes.length >= 2) {
            const firstNode = d3.select(selectedNodes[0]);
            const secondNode = d3.select(selectedNodes[1]);

            firstNode.classed('selected', false);
            secondNode.classed('selected', false);

            that.currentGraph.swap({
              'x': parseInt(firstNode.attr('cx')),
              'y': parseInt(firstNode.attr('cy')),
            }, {
              'x': parseInt(secondNode.attr('cx')),
              'y': parseInt(secondNode.attr('cy')),
            });
          }

          that.svg.selectAll('.link')
              .data(that.currentGraph.links)
              .classed('intersect', function(link) {
                return that.currentGraph.doesIntersect(link);
              })
              .transition()
              .attr('x1', function(link) {
                return that.currentGraph.nodes[link.source].x;
              })
              .attr('y1', function(link) {
                return that.currentGraph.nodes[link.source].y;
              })
              .attr('x2', function(link) {
                return that.currentGraph.nodes[link.target].x;
              })
              .attr('y2', function(link) {
                return that.currentGraph.nodes[link.target].y;
              });
          that.svg.selectAll('.node')
              .data(that.currentGraph.nodes)
              .transition()
              .attr('cx', function(node) {
                return node.x;
              })
              .attr('cy', function(node) {
                return node.y;
              });
        });
  }
}

new Game(570, 550);
