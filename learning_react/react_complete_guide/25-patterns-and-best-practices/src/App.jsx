import Accordion from "./components/accordion/Accordion";
import AccordionItem from "./components/accordion/AccordionItem";

// This example seems a bit convoluted.
// Why not control what is displayed in Accordion and pass props to AccordionItem?
// Although, this is what we are doing, albeit overcomplicated
function App() {
  return (
    <main>
      <section>
        <h2>Lorem ipsum dolor</h2>
        <Accordion className="accordion">
          <AccordionItem
            id="experience"
            title="Lorem ipsum dolor sit amet"
            className="accordion-item"
          >
            <article>
              <p>You can&apos;t go wrong with us.</p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
                fugiat mollitia aliquam impedit itaque. Et totam officia
                expedita maiores voluptates?
              </p>
            </article>
          </AccordionItem>
          <AccordionItem
            id="local-guides"
            title="Another one"
            className="accordion-item"
          >
            <article>
              <p>Another call to action</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                iusto voluptates rerum, cupiditate voluptatibus necessitatibus
                natus libero dolores magni tempore molestias inventore
                reprehenderit corporis dicta reiciendis aspernatur sunt
                consequatur maxime adipisci omnis. Deserunt dignissimos nesciunt
                vel atque labore earum natus?
              </p>
            </article>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}

export default App;
