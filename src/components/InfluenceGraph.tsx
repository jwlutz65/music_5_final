import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GraphNode, GraphLink } from '../lib/types';

interface InfluenceGraphProps {
  /** Array of nodes for the graph */
  nodes: GraphNode[];
  /** Array of links between nodes */
  links: GraphLink[];
}

interface NodeDetail {
  node: GraphNode;
  historicalContext: string;
}

/**
 * InfluenceGraph component renders a D3 force-directed graph with interactive features
 * Features hover highlighting, click to zoom, and side panel for node details
 */
export const InfluenceGraph: React.FC<InfluenceGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);
  const [clickCount, setClickCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!svgRef.current || !nodes.length) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    const g = svg.append('g');

    // Create simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).strength((d: any) => d.strength / 10))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke', '#ff4500')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d: any) => Math.sqrt(d.strength) * 2);

    // Create nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node')
      .attr('r', 8)
      .style('fill', (d: any) => d3.schemeCategory10[d.group])
      .style('stroke', '#fff')
      .style('stroke-width', 2)
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Add labels
    const labels = g.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text((d: any) => d.label)
      .style('font-size', '12px')
      .style('font-family', 'monospace')
      .style('fill', '#ffffff')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none');

    // Node interactions
    node
      .on('mouseover', function(event, d: any) {
        // Highlight connected nodes
        const connectedNodes = new Set();
        links.forEach(link => {
          if (link.source === d.id) connectedNodes.add(link.target);
          if (link.target === d.id) connectedNodes.add(link.source);
        });

        node.style('opacity', (n: any) => 
          n.id === d.id || connectedNodes.has(n.id) ? 1 : 0.3);
        link.style('opacity', (l: any) => 
          l.source.id === d.id || l.target.id === d.id ? 1 : 0.1);
      })
      .on('mouseout', function() {
        node.style('opacity', 1);
        link.style('opacity', 0.6);
      })
      .on('click', function(event, d: any) {
        const currentCount = clickCount[d.id] || 0;
        const newCount = currentCount + 1;
        
        setClickCount(prev => ({ ...prev, [d.id]: newCount }));

        if (newCount === 1) {
          // First click: zoom to node
          const transform = d3.zoomTransform(svg.node() as any);
          const newTransform = transform
            .translate(width / 2 - d.x * transform.k, height / 2 - d.y * transform.k)
            .scale(2);
          
          svg.transition()
            .duration(750)
            .call(zoom.transform as any, newTransform);
        } else if (newCount === 2) {
          // Second click: open side panel
          setSelectedNode({
            node: d,
            historicalContext: generateHistoricalContext(d)
          });
          setClickCount(prev => ({ ...prev, [d.id]: 0 }));
        }
      });

    // Simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y + 20);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, links, clickCount]);

  const generateHistoricalContext = (node: GraphNode): string => {
    // Generate contextual information based on node data
    return `Historical context for ${node.label} (Group ${node.group}): This node represents a significant influence in the Paranoid research network, connecting various musical and cultural elements that shaped the album's creation.`;
  };

  return (
    <div className="flex gap-4">
      <Card className="flex-1 bg-paranoid-gray-dark border-paranoid-orange">
        <CardHeader>
          <CardTitle className="text-paranoid-orange">Influence Network</CardTitle>
        </CardHeader>
        <CardContent>
          <svg
            ref={svgRef}
            width={800}
            height={600}
            className="bg-paranoid-black rounded"
            role="img"
            aria-label="Interactive force-directed graph showing influence networks"
          />
        </CardContent>
      </Card>
      
      {selectedNode && (
        <Card className="w-80 bg-paranoid-gray-dark border-paranoid-orange">
          <CardHeader>
            <CardTitle className="text-paranoid-orange">{selectedNode.node.label}</CardTitle>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-paranoid-white hover:text-paranoid-orange absolute top-4 right-4"
            >
              ×
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-paranoid-white text-sm">
                <strong>Group:</strong> {selectedNode.node.group}
              </p>
              <p className="text-paranoid-white text-sm">
                {selectedNode.historicalContext}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 