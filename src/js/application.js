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

class Game {
  constructor(width, height) {
    this.levels = [
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
    ];
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

    this.svg.selectAll('.link')
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
    this.svg.selectAll('.node')
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
          // eslint-disable-next-line no-invalid-this
          d3.select(this).classed('selected', true);

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
