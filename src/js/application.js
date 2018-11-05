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
    const currentGraph = this.currentGraph;
    const links = currentGraph.links.map(function(link) {
      return {
        'classes': currentGraph.doesIntersect(link) ? 'link intersect' : 'link',
        'x1': currentGraph.nodes[link.source].x,
        'y1': currentGraph.nodes[link.source].y,
        'x2': currentGraph.nodes[link.target].x,
        'y2': currentGraph.nodes[link.target].y,
      };
    });
    const nodes = currentGraph.nodes;

    this.svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', function(link) {
          return link.classes;
        })
        .attr('x1', function(link) {
          return link.x1;
        })
        .attr('y1', function(link) {
          return link.y1;
        })
        .attr('x2', function(link) {
          return link.x2;
        })
        .attr('y2', function(link) {
          return link.y2;
        });
    this.svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', 10)
        .attr('cx', function(node) {
          return node.x;
        })
        .attr('cy', function(node) {
          return node.y;
        });
  }
}

new Game(570, 550);
