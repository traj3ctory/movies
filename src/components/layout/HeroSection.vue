<template>
  <div class="img_container">
    <img
      :src="require('@/assets/img/hero_img.jpg')"
      alt="Hero Section"
      class="img-fluid"
    />
    <div class="details">
      <small
        ><span class="text-warning">Featured</span> | 2019 | Action, Sci-Fi,
        Drama</small
      >
      <h4 class="title">Star Wars: The Rise of Skywalker</h4>
      <small class="desc">
        The revival of Emperor Palpatine resurrects the battle between the
        Resistance and the First Order while the Jedi's legendary conflict with
        the Sith Lord comes to a head.
      </small>
      <div class="ratings">
        <div class="d-flex align-items-center"><StarIcon />9.0</div>
        <span class="rated">16+</span>
      </div>
      <div class="buttons">
        <button class="btn btn-primary" @click="comingSoon">
          <PlayIcon />
          <span>Watch now</span>
        </button>
        <button class="btn btn-info" @click="comingSoon">
          <InfoIcon />
          <span>Learn more</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StarIcon from "@/components/icons/star.vue";
import PlayIcon from "@/components/icons/play.vue";
import InfoIcon from "@/components/icons/info.vue";

export default defineComponent({
  name: "HeroSection",
  components: {
    StarIcon,
    PlayIcon,
    InfoIcon,
  },
  setup() {
    const comingSoon = () => alert("Coming Soon !!!!");

    return {
      comingSoon,
    };
  },
});
</script>

<style lang="scss" scoped>
div.img_container {
  height: 70vh;
  max-height: 70vh;
  overflow-y: hidden;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(
      0,
      0,
      0,
      0.5
    ); /* Set the desired opacity and color */
    z-index: 1; /* Adjust the z-index value as needed */
  }
  div.details {
    position: absolute;
    top: 25%;
    left: 10%;
    color: white;
    width: 30%;
    z-index: 10;
    font-family: "Archivo";
    font-style: normal;
    small {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    }
    h4.title {
      font-weight: 600;
      font-size: 2.625rem;
      line-height: 2.75rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    div.ratings {
      display: flex;
      font-size: 0.9rem;
      margin: 1rem 0;
      gap: 0.75rem;
      align-items: center;
      span.rated {
        padding: 0.05rem 0.5rem;
        border: 1px solid #cbd1d8;
        border-radius: 100px;
      }
    }
    div.buttons {
      display: flex;
      gap: 0.5rem;
      button {
        color: white;
        &.btn-info {
          border: 1px solid #98b6ff;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  div.img_container {
    height: auto;
    max-height: none;
    overflow-y: visible;
    img {
      height: inherit;
      width: 100%;
    }
    div.details {
      top: 15%;
      left: 10%;
      width: 50%;
    }
  }
}

@media (max-width: 700px) {
  div.img_container {
    height: 70vh;
    max-height: none;
    overflow-y: visible;
    div.details {
      top: 7%;
      width: 90%;
    }
  }
}
</style>
