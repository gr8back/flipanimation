import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";

// don't forget to register plugins
gsap.registerPlugin(Flip);

function FlipAnimation() {
  const [activeitem, setactiveitem] = useState(null);
  const [details, setdetails] = useState("testvalue1");
  const [detailContent, setdetailcontent] = useState("testvalue2");
  const [detailImage, setdetailimage] = useState("testvalue3");
  const [detailTitle, setdetailtitle] = useState("testvalue4");
  const [detailSecondary, setdetailsecondary] = useState(
    "Placeholder secondary"
  );
  const [detailDescription, setdetaildescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur\n" +
      "\t\t\t\t\t  consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
  );

  const ref = useRef();
  const reftitle = useRef("reftitle");
  const refcontent = useRef("refcontent");
  const refimage = useRef("refimage");
  const refsecondary = useRef("refsecondary");

  document.addEventListener("load", () => {
    gsap.to(".zapp", { autoAlpha: 1, duration: 0.2 });
    gsap.from(".item", { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
  });

  function showDetails(item) {
    refimage.current.src = item.target.src;
    if (activeitem) {
      // someone could click on an element behind the open details panel in which case we should just close it.
      return hideDetails();
    }
    let onLoad = () => {
      Flip.fit(ref.current, item.target, { scale: true });

      const state = Flip.getState(ref.current);
      //
      // // set the final state
      gsap.set(ref.current, { clearProps: true }); // wipe out all inline stuff so it's in the native state (not scaled)
      gsap.set(ref.current, {
        xPercent: -50,
        top: "50%",
        yPercent: -50,
        visibility: "visible",
        // overflow: "hidden",
      });
      //
      Flip.from(state, {
        duration: 1.5,
        ease: "power2.inOut",
        scale: true,
        onComplete: () => gsap.set(details, { overflow: "auto" }), // to permit scrolling if necessary
      })
        // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
        .to(detailContent, { yPercent: 0 }, 0.2);
    };
    const data = item.currentTarget.dataset;
    onLoad();

    setdetailtitle(data.title);
    setdetailsecondary(data.secondary);
    setdetaildescription(data.text);
    setactiveitem(item);
  }

  function hideDetails() {
    gsap.set(ref.current, { overflow: "hidden" });

    const state = Flip.getState(ref.current);

    Flip.fit(ref.current, activeitem.target, {
      scale: true,
      fitChild: detailImage,
    });

    // animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
    const tl = gsap.timeline();
    const items = gsap.utils.toArray(".item");
    tl.set(ref.current, { overflow: "hidden" })
      .to(detailContent, { yPercent: -100 })
      .to(items, {
        opacity: 1,
        stagger: { amount: 0.7, from: items.indexOf(activeitem), grid: "auto" },
      })
      .to(".zapp", { backgroundColor: "#fff" }, "<");

    // animate from the original state to the current one.
    Flip.from(state, {
      scale: true,
      duration: 0.5,
      delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
      onInterrupt: () => tl.kill(),
    }).set(ref.current, { visibility: "hidden" });
    refimage.current.src = "";
    setactiveitem(null);
  }

  return (
    <div className="zapp">
      <div className="gallery">
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Owl"
          data-secondary="Hoo are you?"
          data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            data-title="Owl"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png"
            alt="abc"
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Deer"
          data-secondary="Hi deer."
          data-text="Deer lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-deer.png"
            alt=""
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Hipster"
          data-secondary="What's new?"
          data-text="Hipster lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-hipster.png"
            alt=""
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Ram"
          data-secondary="I just drank a Mountain Dew."
          data-text="Ram lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-ram.png"
            alt=""
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Dog"
          data-secondary="I'm trying to sleep here."
          data-text="Dog lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-dog.png"
            alt=""
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Bored Ram"
          data-secondary="No time for you."
          data-text="Ram side lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-sideram.png"
            alt=""
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Super Ram"
          data-secondary="I have lazer vision."
          data-text="Ram horns lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-multiram.png"
            alt=""
          />
        </div>
        <div
          onClick={(elem) => showDetails(elem)}
          className="item"
          data-title="Gorilla"
          data-secondary="I can fit a whole watermelon in my mouth."
          data-text="Gorrilla lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-gorilla.png"
            alt=""
          />
        </div>
        <div
          onClick={(e, data) => showDetails(e)}
          className="item"
          data-title="Birb"
          data-secondary="I'm just here to chill."
          data-text="Birb lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit."
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-bird.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <div>
          <div className="detail" ref={ref} onClick={() => {
                  hideDetails();
                }}>
            <img ref={refimage} />

            <div ref={refcontent} className="content">

              <div ref={reftitle} className="title">
                {detailTitle}
              </div>
              <div ref={refsecondary} className="secondary">
                {detailSecondary}
              </div>
              <div className="description">{detailDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipAnimation;
