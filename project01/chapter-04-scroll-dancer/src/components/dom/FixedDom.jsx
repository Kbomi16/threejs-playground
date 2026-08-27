import styled from 'styled-components'

export default function FixedDom() {
  return (
    <FixedDOMWrapper id="fixed">
      <span>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quaerat
        beatae dolor qui repellat eos mollitia maiores suscipit dolorem.
        Voluptates cupiditate quia, totam perspiciatis doloribus voluptatibus
        iusto consequatur inventore sequi! Corrupti placeat ratione eius
        explicabo quibusdam! Suscipit distinctio expedita, possimus vel
        doloremque ipsam sunt natus itaque dolorem, obcaecati dolor alias optio
        dicta beatae! Reiciendis quisquam deserunt sapiente aut minima
        reprehenderit. Eos vel, optio autem beatae necessitatibus suscipit,
        perferendis iure rerum odit dolores et? Veniam, eos. Ea perspiciatis
        nulla ex. Recusandae aperiam, necessitatibus totam quod nisi voluptatum
        ullam architecto accusamus reprehenderit. Accusantium aperiam facilis
        blanditiis nam nemo ad excepturi illum earum nesciunt minima? Quos
        voluptas exercitationem, officiis, aspernatur dolor reprehenderit
        corporis in ullam doloribus voluptatem similique adipisci hic odit vero
        necessitatibus.
      </span>
      <img src="/threejs.webp" alt="threejs-logo" />
      <span>
        Interesting Threejs Projects Interesting Threejs Projects Interesting
        Threejs Projects Interesting Threejs Projects Interesting Threejs
        Projects Interesting Threejs Projects Interesting Threejs Projects
        Interesting Threejs Projects Interesting Threejs Projects Interesting
        Threejs Projects Interesting Threejs Projects Interesting Threejs
        Projects Interesting Threejs Projects Interesting Threejs Projects
        Interesting Threejs Projects Interesting Threejs Projects Interesting
        Threejs Projects Interesting Threejs Projects Interesting Threejs
        Projects Interesting Threejs Projects Interesting Threejs Projects
      </span>
    </FixedDOMWrapper>
  )
}

const FixedDOMWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  position: fixed;
  font-size: 8px;
  top: 50%;
  right: 0;
  transform: translateY(-50%, -50%);
  display: none;
  color: #fff;
  z-index: 0;
  pointer-events: none;
  img {
    width: 100%;
  }
`
