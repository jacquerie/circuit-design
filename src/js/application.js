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

const LEVELS = [
  new Graph([
    {'source': 0, 'target': 2},
    {'source': 0, 'target': 3},
    {'source': 1, 'target': 2},
    {'source': 1, 'target': 3},
  ], [
    {'x': 190, 'y': 180},
    {'x': 380, 'y': 180},
    {'x': 380, 'y': 370},
    {'x': 190, 'y': 370},
  ]),
  new Graph([
    {'source': 0, 'target': 1},
    {'source': 1, 'target': 2},
    {'source': 2, 'target': 4},
    {'source': 3, 'target': 0},
    {'source': 3, 'target': 4},
  ], [
    {'x': 285, 'y': 180},
    {'x': 195, 'y': 246},
    {'x': 229, 'y': 352},
    {'x': 341, 'y': 352},
    {'x': 375, 'y': 246},
  ]),
  new Graph([
    {'source': 0, 'target': 2},
    {'source': 0, 'target': 3},
    {'source': 1, 'target': 3},
    {'source': 1, 'target': 4},
    {'source': 2, 'target': 5},
    {'source': 4, 'target': 5},
  ], [
    {'x': 333, 'y': 193},
    {'x': 237, 'y': 193},
    {'x': 190, 'y': 275},
    {'x': 238, 'y': 357},
    {'x': 332, 'y': 357},
    {'x': 380, 'y': 275},
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
    {'x': 190, 'y': 180},
    {'x': 285, 'y': 180},
    {'x': 380, 'y': 180},
    {'x': 190, 'y': 285},
    {'x': 285, 'y': 285},
    {'x': 380, 'y': 285},
    {'x': 190, 'y': 380},
    {'x': 285, 'y': 380},
    {'x': 380, 'y': 380},
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
    {'x': 285, 'y': 123},
    {'x': 140, 'y': 228},
    {'x': 196, 'y': 398},
    {'x': 374, 'y': 398},
    {'x': 430, 'y': 228},
  ]),
];

class Game {
  constructor(width, height) {
    this.levels = LEVELS;
    this.svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

    this.currentLevel = 0;
    this.currentGraph = this.levels[this.currentLevel];
    this.play();
  }

  play() {
    const svg = this.svg;
    const currentGraph = this.currentGraph;

    svg.selectAll('.link')
        .data(currentGraph.links)
        .enter().append('line')
        .attr('class', function(link) {
          return currentGraph.doesIntersect(link) ? 'link intersect' : 'link';
        })
        .attr('x1', function(link) {
          return currentGraph.nodes[link.source].x;
        })
        .attr('y1', function(link) {
          return currentGraph.nodes[link.source].y;
        })
        .attr('x2', function(link) {
          return currentGraph.nodes[link.target].x;
        })
        .attr('y2', function(link) {
          return currentGraph.nodes[link.target].y;
        });
    svg.selectAll('.node')
        .data(currentGraph.nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', 8)
        .attr('cx', function(node) {
          return node.x;
        })
        .attr('cy', function(node) {
          return node.y;
        })
        .on('click', function(node, i, nodes) {
          /* eslint-disable no-invalid-this */
          d3.select(this).classed(
              'selected', !d3.select(this).classed('selected'));
          /* eslint-enable no-invalid-this */

          const selectedNodes = [];
          for (let j = 0; j < nodes.length; j++) {
            if (d3.select(nodes[j]).classed('selected')) {
              selectedNodes.push(nodes[j]);
            }
          }

          if (selectedNodes.length >= 2) {
            const firstNode = d3.select(selectedNodes[0]);
            const secondNode = d3.select(selectedNodes[1]);

            firstNode.classed('selected', false);
            secondNode.classed('selected', false);

            currentGraph.swap({
              'x': parseInt(firstNode.attr('cx')),
              'y': parseInt(firstNode.attr('cy')),
            }, {
              'x': parseInt(secondNode.attr('cx')),
              'y': parseInt(secondNode.attr('cy')),
            });

            svg.selectAll('.link')
                .data(currentGraph.links)
                .classed('intersect', function(link) {
                  return currentGraph.doesIntersect(link);
                })
                .transition()
                .attr('x1', function(link) {
                  return currentGraph.nodes[link.source].x;
                })
                .attr('y1', function(link) {
                  return currentGraph.nodes[link.source].y;
                })
                .attr('x2', function(link) {
                  return currentGraph.nodes[link.target].x;
                })
                .attr('y2', function(link) {
                  return currentGraph.nodes[link.target].y;
                });
            svg.selectAll('.node')
                .data(currentGraph.nodes)
                .transition()
                .attr('cx', function(node) {
                  return node.x;
                })
                .attr('cy', function(node) {
                  return node.y;
                });
          }
        });
  }
}

new Game(570, 550);
