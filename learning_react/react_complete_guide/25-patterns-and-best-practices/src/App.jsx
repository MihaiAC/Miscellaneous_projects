import Accordion from "./components/accordion/Accordion";
import SearchableList from "./components/searchableList/SearchableList";

import savannaImg from "./assets/african-savanna.jpg";
import amazonImg from "./assets/amazon-river.jpg";
import caribbeanImg from "./assets/caribbean-beach.jpg";
import desertImg from "./assets/desert-dunes.jpg";
import forestImg from "./assets/forest-waterfall.jpg";

import Place from "./components/searchableList/Place";

const PLACES = [
  {
    id: "african-savanna",
    image: savannaImg,
    title: "African Savanna",
    description: "Experience the beauty of nature.",
  },
  {
    id: "amazon-river",
    image: amazonImg,
    title: "Amazon River",
    description: "Get to know the largest river in the world.",
  },
  {
    id: "caribbean-beach",
    image: caribbeanImg,
    title: "Caribbean Beach",
    description: "Enjoy the sun and the beach.",
  },
  {
    id: "desert-dunes",
    image: desertImg,
    title: "Desert Dunes",
    description: "Discover the desert life.",
  },
  {
    id: "forest-waterfall",
    image: forestImg,
    title: "Forest Waterfall",
    description: "Listen to the sound of the water.",
  },
];

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
            <Accordion.Title className="accordion-item-title">
              Lorem ipsum dolor sit amet
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
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
            <Accordion.Title className="accordion-item-title">
              Another one
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
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
      <section>
        <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
          {(item) => <Place item={item}></Place>}
        </SearchableList>
        <SearchableList items={["item 1", "item 2"]} itemKeyFn={(item) => item}>
          {(item) => item}
        </SearchableList>
      </section>
    </main>
  );
}

export default App;
