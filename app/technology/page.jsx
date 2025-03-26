import { Card } from 'components/card';
import { Markdown } from 'components/markdown';

export const metadata = {
    title: 'MCP Technology'
};

const technologyExplainer = `
# Model Context Protocol (MCP) Technology

Model Context Protocol is a specialized framework for managing and optimizing how AI models process contextual information. 
Our implementation focuses on enterprise-grade performance, security, and scalability.
`;

const technicalDetails = `
## Key Technical Features

- **Enhanced Context Windows**: Process larger context windows with optimal memory utilization
- **Efficient Token Management**: Advanced techniques for token compression and prioritization
- **Real-time Processing**: Low-latency processing of context information for time-sensitive applications
- **Integration APIs**: Well-documented APIs for seamless integration with existing systems
- **Scalable Architecture**: Designed to scale horizontally for enterprise-level demands
`;

export default function TechnologyPage() {
    return (
        <>
            <Markdown content={technologyExplainer} className="mb-8" />

            <div className="mb-12">
                <Card title="Why MCP Matters">
                    <p>
                        In modern AI systems, context is everything. The Model Context Protocol allows systems to
                        maintain, process, and utilize larger amounts of contextual information more efficiently than
                        traditional approaches.
                    </p>
                    <p className="mt-4">
                        By implementing our MCP server solutions, your AI applications can make better decisions with
                        more complete information, leading to improved user experiences and business outcomes.
                    </p>
                </Card>
            </div>

            <Markdown content={technicalDetails} className="mb-12" />

            <div className="grid gap-6 md:grid-cols-2">
                <Card title="Performance Metrics">
                    <ul className="pl-5 list-disc">
                        <li>Up to 40% improvement in context processing speed</li>
                        <li>Support for 2-4x larger context windows</li>
                        <li>Reduced memory requirements for large contexts</li>
                        <li>Linear scaling with additional hardware</li>
                    </ul>
                </Card>

                <Card title="Compatibility">
                    <ul className="pl-5 list-disc">
                        <li>Works with all major ML frameworks</li>
                        <li>Cloud-native design for modern deployments</li>
                        <li>On-premises options available</li>
                        <li>Support for legacy system integration</li>
                    </ul>
                </Card>
            </div>
        </>
    );
}
