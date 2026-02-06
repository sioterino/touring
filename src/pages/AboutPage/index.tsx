import AccordionGroup from "../../components/Accordion/AccordionGroup"
import AccordionItem from "../../components/Accordion/AccordionItem"
import Heading from "../../components/Heading"

const AboutPage = () => {

    return (
        <div>
           <Heading title='About K-Pop Touring Data' desc='Your comprehensive source for K-pop touring statistics, analytics, and insights.' />
           {/* <EmptyArray /> */}

            <p style={{ color: "hsl(0 0% 45%)", marginBottom: 32, lineHeight: 1.6, }} >
                Only one item can be open at a time in this section.
            </p>


            <AccordionGroup>
                
                <AccordionItem title="Who we are">
                    {`We are a small team of designers and engineers passionate about building **great user experiences**.

                    - Founded in 2020
                    - Based in Berlin, Germany
                    - Fully remote team across *5 countries*`}
                </AccordionItem>

                <AccordionItem title="Our mission">
                    {`Our mission is to make the web more **accessible** and **delightful** for everyone.

                    We focus on:
                    - Clean, semantic interfaces
                    - Performance-first architecture
                    - Inclusive design from day one`}
                </AccordionItem>

                <AccordionItem title="Services we offer">
                    <AccordionGroup allowMultiple>
                            <AccordionItem title="Design">
                                {`We craft interfaces that feel intuitive:
                                - Brand identity and design systems
                                - UI/UX audits and redesigns
                                - Prototyping with \`Figma\``}
                            </AccordionItem>
                            <AccordionItem title="Development">
                                {`Full-stack web development using modern tools:
                                - **React** and **Next.js** applications
                                - Accessible component libraries
                                - API design and integrations`}
                            </AccordionItem>
                            <AccordionItem title="Consulting">
                                {`We help teams level up:
                                - Code reviews and architecture guidance
                                - Performance optimization
                                - Accessibility compliance`}
                            </AccordionItem>
                        </AccordionGroup>
                    </AccordionItem>

                    <AccordionItem title="How to reach us">
                        {`Drop us a line any time:
                        - Email: **hello@example.com**
                        - Twitter: *@example*
                        - Office hours: Mon-Fri, 9 AM - 5 PM CET`}
                    </AccordionItem>

            </AccordionGroup>
        </div>
    )

}

export default AboutPage
