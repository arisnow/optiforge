import { Card } from 'components/card';
import { Markdown } from 'components/markdown';

export const metadata = {
    title: 'MCP Server Services'
};

const servicesExplainer = `
We provide comprehensive Model Context Protocol server implementation and optimization services
for businesses looking to enhance their AI and machine learning capabilities.
`;

const services = [
    {
        title: 'Custom MCP Server Development',
        description:
            'Tailored MCP server solutions designed to match your specific business requirements and existing software architecture.'
    },
    {
        title: 'MCP Integration Services',
        description:
            'Seamless integration of MCP servers with your current infrastructure, ensuring minimal disruption to your operations.'
    },
    {
        title: 'Performance Optimization',
        description: 'Fine-tuning your MCP servers for maximum efficiency, reducing latency and increasing throughput.'
    },
    {
        title: 'Scaling Solutions',
        description: 'Strategies and implementations to scale your MCP infrastructure as your business grows.'
    },
    {
        title: 'Maintenance & Support',
        description: 'Ongoing technical support and maintenance to keep your MCP servers running smoothly.'
    }
];

export default function ServicesPage() {
    return (
        <>
            <h1 className="mb-8">Our MCP Server Services</h1>
            <Markdown content={servicesExplainer} className="mb-12" />

            <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, index) => (
                    <Card key={index} title={service.title}>
                        <p>{service.description}</p>
                    </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
                <h2 className="mb-6">Ready to Enhance Your Software with MCP?</h2>
                <a href="/contact" className="btn btn-lg">
                    Contact Us Today
                </a>
            </div>
        </>
    );
}
