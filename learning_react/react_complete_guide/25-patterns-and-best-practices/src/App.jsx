import Accordion from "./components/accordion/Accordion";

// This example seems a bit convoluted.
// Why not control what is displayed in Accordion and pass props to AccordionItem?
// Although, this is what we are doing, albeit overcomplicated
function App() {
  return (
    <main>
      <section>
        <h2>Lorem ipsum dolor</h2>
        <Accordion className="accordion">
          <Accordion.Item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title" id="experience">
              Lorem ipsum dolor sit amet
            </Accordion.Title>
            <Accordion.Content
              id="experience"
              className="accordion-item-content"
            >
              {" "}
              <article>
                <p>You can&apos;t go wrong with us.</p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolor fugiat mollitia aliquam impedit itaque. Et totam officia
                  expedita maiores voluptates?
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="local-guides" className="accordion-item">
            <Accordion.Title className="accordion-item-title" id="local-guides">
              Another one
            </Accordion.Title>
            <Accordion.Content
              className="accordion-item-content"
              id="local-guides"
            >
              <article>
                <p>Another call to action</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  iusto voluptates rerum, cupiditate voluptatibus necessitatibus
                  natus libero dolores magni tempore molestias inventore
                  reprehenderit corporis dicta reiciendis aspernatur sunt
                  consequatur maxime adipisci omnis. Deserunt dignissimos
                  nesciunt vel atque labore earum natus?
                </p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  );
}

export default App;
