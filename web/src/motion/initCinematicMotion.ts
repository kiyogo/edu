import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CONTINUOUS FLOW ENGINE
 * ScrollTrigger observes normal-flow elements. Never pins, changes scrollTop,
 * registers wheel/touch handlers, or creates fake 200vh+ timeline spacers.
 * Every animation reverses with native scroll position.
 */
export function initCinematicMotion(): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: self => gsap.set('.reading-progress__fill', {scaleX: self.progress}),
    });
    if (reduced) return;

    // Use the natural viewport crossing of each composition rather than a pinned stage.
    const flow = (trigger: string, start = 'top 90%', end = 'bottom 15%') =>
      gsap.timeline({
        defaults: {ease: 'none'},
        scrollTrigger: {trigger, start, end, scrub: true, invalidateOnRefresh: true},
      });

    const intro = flow('.opening', 'top top', 'bottom top');
    intro.fromTo('.opening__wordmark', {y:0, opacity:1}, {y:-90, opacity:.48, duration:1},0)
      .fromTo('.opening__frame', {scale:.93}, {scale:1.07, duration:1},0)
      .fromTo('.opening__main-photo img', {scale:1.13}, {scale:1,duration:1},0)
      .fromTo('.opening__floating--one', {y:95,x:-50,rotation:-9}, {y:-70,x:35,rotation:5,duration:1},0)
      .fromTo('.opening__floating--two', {y:60,x:80,rotation:9}, {y:-100,x:-20,rotation:-4,duration:1},0)
      .fromTo('.opening__floating--three', {y:100,x:-30,rotation:-6}, {y:-85,x:60,rotation:4,duration:1},0)
      .to('.opening__birds .bird', {x:()=>-Math.min(innerWidth*.42,550), y:()=>innerHeight*.19, stagger:.06, duration:1},0);

    const idea = flow('.aperture__images');
    idea.fromTo('.aperture__main', {scale:.78,rotation:-13}, {scale:1.06,rotation:3,duration:1},0)
      .fromTo('.aperture__float', {y:80,scale:.72,rotation:-8}, {y:-35,scale:1.04,rotation:4,stagger:.045,duration:.8},.05);
    gsap.fromTo('.aperture__statement', {y:32}, {y:-12,ease:'none',scrollTrigger:{trigger:'.aperture__statement',start:'top bottom',end:'bottom 20%',scrub:true}});

    const vn = flow('.vietnam__network');
    vn.to('.vietnam__trace', {strokeDashoffset:0,duration:1},0)
      .fromTo('.vietnam__node',{opacity:0},{opacity:1,stagger:.22,duration:.25},.22);
    flow('.vietnam__photo-field').fromTo('.vietnam__tile',
      {y:70,rotation:-7,scale:.9}, {y:-34,rotation:3,scale:1.03,stagger:.05,duration:.85},.05);
    gsap.to('.vietnam__birds .bird', {x:()=>-innerWidth*.46,y:95,stagger:.04,ease:'none',scrollTrigger:{trigger:'.vietnam',start:'top bottom',end:'bottom top',scrub:true}});

    const product = flow('.product-reveal__camera');
    product.fromTo('.product-reveal__hero', {scale:.85,rotationY:-8,rotationX:3}, {scale:1.06,rotationY:0,rotationX:0,duration:1},0)
      .fromTo('.product-reveal__satellite', {scale:.78,y:75,rotation:-7}, {scale:1.03,y:-33,rotation:4,stagger:.06,duration:.85},.08);

    gsap.utils.toArray<HTMLElement>('.film-strip__composition').forEach(comp => {
      gsap.fromTo(comp.querySelectorAll('.film-strip__photo'),
        {y:70,scale:.92,rotation:-3},
        {y:-35,scale:1.02,rotation:2,stagger:.05,ease:'none',scrollTrigger:{trigger:comp,start:'top 95%',end:'bottom 15%',scrub:true}});
    });
    gsap.fromTo('.editorial__portal-main img', {scale:1.12}, {scale:1,ease:'none',scrollTrigger:{trigger:'.editorial__portal',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.fromTo('.editorial__portal-accent', {y:60,rotation:-5}, {y:-40,rotation:4,ease:'none',scrollTrigger:{trigger:'.editorial__portal',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.fromTo('.editorial__band-bg img', {scale:1.12}, {scale:1,ease:'none',scrollTrigger:{trigger:'.editorial__band',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.fromTo('.editorial__closing .photo', {y:65,rotation:-3}, {y:-30,rotation:2,stagger:.04,ease:'none',scrollTrigger:{trigger:'.editorial__closing',start:'top bottom',end:'bottom top',scrub:true}});

    flow('.mobile-orbit__frames').fromTo('.mobile-orbit__frame',
      {y:75,rotation:(i:number)=>i%2 ? 9 : -9,scale:.9},
      {y:-35,rotation:(i:number)=>i%2 ? -3 : 3,scale:1.04,stagger:.05,duration:.85},0);
    gsap.fromTo('.mobile-orbit__disc', {rotation:-40}, {rotation:55,ease:'none',scrollTrigger:{trigger:'.mobile-orbit',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.fromTo('.library__film-photo img', {scale:1.12}, {scale:1,ease:'none',scrollTrigger:{trigger:'.library__film',start:'top bottom',end:'bottom top',scrub:true}});
    flow('.library__constellation').fromTo('.library__art', {y:75,rotation:-6}, {y:-35,rotation:3,stagger:.055,duration:.85},0);
    flow('.library__mobile-echo').fromTo('.library__mobile-photo', {y:58,scale:.93}, {y:-28,scale:1.03,stagger:.07,duration:.83},0);

    // Quiz and AI are both in the document: the next visual starts entering before the prior exits.
    for (const selector of ['.horizons__concept--quiz','.horizons__concept--ai']) {
      flow(`${selector} .horizons__images`)
        .fromTo(`${selector} .horizons__image`, {y:78,rotation:-5,scale:.9},
          {y:-32,rotation:3,scale:1.04,stagger:.06,duration:.86},0);
    }
    gsap.fromTo('.ending__film-main img', {scale:1.13}, {scale:1,ease:'none',scrollTrigger:{trigger:'.ending__film',start:'top bottom',end:'bottom top',scrub:true}});
    flow('.ending__film').fromTo('.ending__orbit', {y:55,rotation:-9}, {y:-45,rotation:5,stagger:.04,duration:.95},0)
      .to('.ending__birds .bird',{x:()=>-innerWidth*.32,y:-65,stagger:.03,duration:1},0);
  });
  // ScrollTrigger automatically watches resize. Trigger geometry stays stable because
  // image frames reserve their aspect ratio even before the asset loads.
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load',onLoad,{once:true});
  return () => {window.removeEventListener('load',onLoad);ctx.revert();};
}
