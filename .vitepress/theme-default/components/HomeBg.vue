<template>
  <div class="home-bg">
    <div class="content-bg">
      <h1>
        {{ $site.title }}
        <p>{{ $site.description }}</p>
      </h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home-bg {
  width: 100%;
  margin-top: 3rem;
  background: url(../bg.svg) center center/cover no-repeat;
  height: 450px;
  position: relative;
  overflow: hidden;
}
.content-bg {
  width: 100%;
  height: 450px;
  background-color: var(--content-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-bg h1 {
  color: var(--content-bg-color);
}
.content-bg h1 p {
  font: 500 18px Consolas,Monaco,monospace;
  border-right: .1em solid;
  width: 9em;
  white-space: nowrap;
  overflow: hidden;
  animation: 3s steps(9, end) typing-30ae5035,.5s step-end infinite alternate blink-caret-30ae5035;
  margin: 0;
  text-align: center;
  margin-top: 1em;
}
@keyframes typing-30ae5035 {
 from {
  width:0
 }
}
@keyframes blink-caret-30ae5035 {
 50% {
  border-color:transparent
 }
}
@media screen and (max-width: 700px) {
  .home-bg {
    height: 20rem;
  }
  .content-bg {
    height: 100%;
  }
}
</style>