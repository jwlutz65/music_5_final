import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GraphNode, GraphLink } from '../lib/types';

// Extend GraphNode for D3 simulation properties
interface D3GraphNode extends GraphNode {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface InfluenceGraphProps {
  /** Array of nodes for the graph */
  nodes: GraphNode[];
  /** Array of links between nodes */
  links: GraphLink[];
}

/**
 * InfluenceGraph component renders an interactive D3.js force-directed graph
 * with a sidebar library showing grouped nodes with expandable information
 */
export const InfluenceGraph: React.FC<InfluenceGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  // Group nodes by their group property
  const groupedNodes = React.useMemo(() => {
    const groups = new Map<number, { name: string; nodes: GraphNode[] }>();
    
    const groupNames: { [key: number]: string } = {
      1: 'Core Band',
      2: 'Historical Context', 
      3: 'Musical Influences',
      4: 'Cultural Legacy',
      5: 'Modern Impact'
    };

    nodes.forEach(node => {
      if (!groups.has(node.group)) {
        groups.set(node.group, {
          name: groupNames[node.group] || `Group ${node.group}`,
          nodes: []
        });
      }
      groups.get(node.group)!.nodes.push(node);
    });

    return Array.from(groups.entries()).sort(([a], [b]) => a - b);
  }, [nodes]);

  // Color scale for different groups using expanded paranoid palette
  const colorScale = d3.scaleOrdinal<number, string>()
    .domain([1, 2, 3, 4, 5])
    .range(['#ff4500', '#ec4899', '#8b5cf6', '#3b82f6', '#dc2626']); // orange, pink, purple, blue, red

  const toggleGroup = (groupId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    // Expand the group if not already expanded
    if (!expandedGroups.has(node.group)) {
      setExpandedGroups(prev => new Set(Array.from(prev).concat([node.group])));
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Much larger dimensions for full-screen experience
    const width = 1200;
    const height = 800;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create main group for zoom/pan
    const g = svg.append('g');

    // Set up zoom behavior (pan only, no zoom)
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 1]) // Disable zoom, only allow pan
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create force simulation with adjusted parameters for larger space
    const simulation = d3.forceSimulation(nodes as D3GraphNode[])
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(200))
      .force('charge', d3.forceManyBody().strength(-1200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60))
      .force('x', d3.forceX(width / 2).strength(0.1))
      .force('y', d3.forceY(height / 2).strength(0.1));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#8b5cf6') // paranoid-purple for links
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', (d: GraphLink) => Math.sqrt(d.strength) * 2);

    // Create nodes with old format
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 10)
      .attr('fill', (d: GraphNode) => colorScale(d.group))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer');

    // Create labels with old format
    const labels = g.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text((d: GraphNode) => d.label)
      .attr('font-size', '14px')
      .attr('font-family', 'monospace')
      .attr('fill', '#ffffff')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .style('font-weight', 'bold');

    // Add interaction handlers with proper left-click detection
    let isDragging = false;
    let dragStartTime = 0;

    node
      .on('mousedown', function(event, d) {
        // Only handle left mouse button (button 0)
        if (event.button !== 0) return;
        dragStartTime = Date.now();
        isDragging = false;
      })
      .on('mousemove', function(event, d) {
        if (Date.now() - dragStartTime > 150) { // 150ms threshold for drag
          isDragging = true;
        }
      })
      .on('click', function(event, d) {
        // Prevent default and stop propagation
        event.preventDefault();
        event.stopPropagation();
        
        if (!isDragging && Date.now() - dragStartTime < 150) {
          // Left click - show information
          handleNodeClick(d);
        }
        isDragging = false;
      })
      .on('contextmenu', function(event) {
        // Disable right-click context menu
        event.preventDefault();
      })
      .call(d3.drag<SVGCircleElement, D3GraphNode>()
        .on('start', function(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', function(event, d) {
          isDragging = true;
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', function(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Update positions on simulation tick
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

    return () => {
      simulation.stop();
    };
  }, [nodes, links, colorScale]);

  return (
    <div className="w-full">
      {/* Full-width container with graph and sidebar */}
      <div className="flex gap-8">
        {/* Main Graph - Takes up most of the width */}
        <div className="flex-1">
          <Card className="bg-paranoid-gray-dark border-paranoid-orange">
            <CardHeader>
              <CardTitle className="text-paranoid-orange text-2xl">
                Paranoid Influence Network
              </CardTitle>
              <p className="text-paranoid-white text-base">
                Click nodes for information • Click and hold to move nodes • Drag to pan
              </p>
            </CardHeader>
            <CardContent>
              <svg
                ref={svgRef}
                width="1200"
                height="800"
                className="border border-paranoid-orange rounded bg-paranoid-black w-full"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid meet"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Library - Fixed width */}
        <div className="w-96 flex-shrink-0">
          <Card className="bg-paranoid-gray-dark border-paranoid-orange">
            <CardHeader>
              <CardTitle className="text-paranoid-orange text-xl">
                Node Library
              </CardTitle>
              <p className="text-paranoid-white text-sm">
                Explore influence groups and connections
              </p>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[800px] overflow-y-auto">
              {groupedNodes.map(([groupId, group]) => (
                <div key={groupId} className="border border-paranoid-orange rounded">
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(groupId)}
                    className="w-full p-4 flex items-center justify-between bg-paranoid-black hover:bg-paranoid-gray-light transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: colorScale(groupId) }}
                      />
                      <span className="text-paranoid-white font-semibold text-base">
                        {group.name}
                      </span>
                      <span className="text-paranoid-white text-sm opacity-60">
                        ({group.nodes.length})
                      </span>
                    </div>
                    <span className="text-paranoid-orange text-xl">
                      {expandedGroups.has(groupId) ? '−' : '+'}
                    </span>
                  </button>

                  {/* Group Nodes */}
                  {expandedGroups.has(groupId) && (
                    <div className="border-t border-paranoid-orange">
                      {group.nodes.map((node) => (
                        <div key={node.id} className="border-b border-paranoid-orange last:border-b-0">
                          <button
                            onClick={() => handleNodeClick(node)}
                            className="w-full p-4 text-left hover:bg-paranoid-gray-light transition-colors flex items-center justify-between"
                          >
                            <span className="text-paranoid-white text-base">
                              {node.label}
                            </span>
                            <span className="text-paranoid-orange">
                              {selectedNode?.id === node.id ? '−' : '+'}
                            </span>
                          </button>
                          
                          {/* Node Details */}
                          {selectedNode?.id === node.id && (
                            <div className="p-4 bg-paranoid-black border-t border-paranoid-orange">
                              <h4 className="text-paranoid-orange font-semibold mb-3 text-lg">
                                {node.label}
                              </h4>
                              <p className="text-paranoid-white text-base leading-relaxed">
                                {node.details || 'No additional details available.'}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 