<template>
  <div class="overlay">
    <div class="spinner center">
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
      <div class="spinner-blade"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCircleProgressBar'
}
</script>
<style lang="sass">
.overlay
  height: 250px
.text
  font-size: 48px
  display: inline-block
  &.center
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-color: red
    margin: auto
.spinner
  font-size: 48px
  position: relative
  display: inline-block
  width: 1em
  height: 1em
  &.center
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
  .spinner-blade
    position: absolute
    left: .4629em
    bottom: 0
    width: .074em
    height: .2777em
    border-radius: .0555em
    background-color: transparent
    transform-origin: center -.2222em
    animation: spinner-fade 1s infinite linear

    $animation-delay: 0s
    $blade-rotation: 0deg

    @for $i from 1 through 12
      &:nth-child(#{$i})
        animation-delay: $animation-delay
        transform: rotate($blade-rotation)
        $blade-rotation: $blade-rotation + 30
        $animation-delay: $animation-delay + .083

@keyframes spinner-fade
  0%
    background-color: #9e9bd2
  100%
    background-color: transparent
</style>
