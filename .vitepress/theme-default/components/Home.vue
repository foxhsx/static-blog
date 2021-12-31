<template>
  <div class="blog-container">
    <div class="blog-list">
      <a
        v-show="!article.frontMatter.home"
        :href="base + article.regularPath || ''"
        v-for="(article, index) in dynamicPage.currentData"
        :key="index"
        class="article"
      >
        <div class="article-header">
          <div class="title">
            {{ article.frontMatter.title || "" }}
          </div>
          <time :datetime="article.frontMatter.date" class="time">
            {{ article.frontMatter.date || "" }}
          </time>
        </div>

        <div class="line"></div>
        <p class="describe">
          {{ article.frontMatter.describe || "" }}
        </p>
      </a>
    </div>
    <div class="info-wrapper">
      <div class="console"></div>
      <div class="info-content">
        <div class="card-title">
          <img :src="$site.themeConfig.authorAvatar" alt="" />
        </div>
        <h4>{{ $site.title }}</h4>
        <p class="introduce">{{ $site.themeConfig.introduce }}</p>
        <p class="introduce">精通 Ai、Fw、Fl、Br、Ae、Pr、Id、Ps 等软件的安装与卸载，精通 CSS、JavaScript、PHP、ASP、C、C++、C#、Java、Ruby、Perl、Lisp、Python、Objective-C、ActionScript、Pascal 等单词的拼写，熟悉 Windows、Linux、OS X、Android、iOS、WP8 等系统的开关机。</p>
      </div>
    </div>
  </div>

  <div class="paging">
    <div
      class="prev"
      v-if="initPage.page !== 0"
      @click="getChangePage(-1)"
    ></div>
    <div v-else></div>
    <span>{{ dynamicPage.totalPages }} - {{ initPage.page + 1 }}</span>
    <div
      class="next"
      v-if="initPage.page + 1 !== dynamicPage.totalPages"
      @click="getChangePage(1)"
    ></div>
    <div v-else></div>
  </div>
  <PageEdit />
</template>

<script>
import { defineComponent, computed, reactive } from "vue";
import NavBarLink from "./NavBarLink.vue";
import { withBase, parseMarkdownList } from "../utils";
import { usePageData, useSiteData } from "vitepress";
import { Build } from "../../build";
import PageEdit from "./PageEdit.vue";

export default defineComponent({
  components: {
    NavBarLink,
    PageEdit,
  },
  setup() {
    const pageData = usePageData();
    const siteData = useSiteData();
    const data = computed(() => pageData.value.frontmatter);
    const actionLink = computed(() => ({
      link: data.value.actionLink,
      text: data.value.actionText,
    }));

    const heroImageSrc = computed(() => withBase(data.value.heroImage));
    const siteTitle = computed(() => siteData.value.title);
    const siteDescription = computed(() => siteData.value.description);
    const base = Build();

    // 文章总数据
    let totalData = computed(() =>
      parseMarkdownList(siteData.value.themeConfig.pages)
    );

    // 初始化页码信息
    const initPage = reactive({
      page: 0,
      pageSize: 5,
    });

    // 格式化数据
    const formattedData = () => {
      var incisionArray = new Array(
        Math.ceil(totalData.value.length / initPage.pageSize)
      );
      for (let i = 0; i < incisionArray.length; i++) {
        incisionArray[i] = new Array();
      }
      for (let i = 0; i < totalData.value.length; i++) {
        incisionArray[parseInt(i / initPage.pageSize)][i % initPage.pageSize] =
          totalData.value[i];
      }
      // 返回切割后的二维数组
      return incisionArray;
    };
    // 获取到所有数据
    const ALLDATA = formattedData();

    // 动态切换的分页
    const dynamicPage = reactive({
      currentData: ALLDATA[initPage.page],
      totalPages: ALLDATA.length,
    });

    // 执行分页
    const getChangePage = (page) => {
      if (initPage.page + 1 !== dynamicPage.totalPages || initPage.page !== 0) {
        initPage.page += page;
        dynamicPage.currentData = ALLDATA[initPage.page];
      }
    };

    return {
      data,
      actionLink,
      heroImageSrc,
      dynamicPage,
      base,
      getChangePage,
      siteTitle,
      initPage,
      siteDescription,
    };
  },
});
</script>

<style scoped>
.introduce {
  text-indent: 2em;
}
.blog-container {
  display: flex;
  justify-content: space-between;
}
.blog-container .blog-list {
  flex: 1;
}
.blog-container .info-wrapper {
  margin-left: 40px;
  width: 260px;
  max-height: 740px;
  margin-top: 10px;
  max-width: 260px;
  border-radius: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
}
.info-wrapper .console {
  height: 20px;
  padding: 8px 12px;
  background-color: #e3e3e3;
  border-radius: 12px 12px 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.info-content {
  margin: 0px auto;
  max-width: 50rem;
  overflow-x: hidden;
  padding: 15px;
  box-sizing: border-box;
}
.card-title {
  border-bottom: 1px solid var(--border-color);
  min-height: 40px;
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.card-title > img {
  max-width: 100%;
  border-radius: 12px 12px 0 0;
  cursor: auto;
  opacity: var(--img-opacity);
}
.prev {
  background-image: url("./icons/prev.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.next {
  background-image: url("./icons/next.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.paging {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  justify-content: center;
  align-items: center;
}

.paging > span {
  display: block;
  flex: 1;
  font-size: 1.2rem;
  text-align: center;
  color: var(--text-color-light);
}

.paging > div {
  font-weight: 500;
  font-size: 1.5rem;
  width: 32px;
  height: 32px;
}

.paging > div:hover {
  text-decoration: none !important;
}
.article {
  display: block;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color-light);
  padding: 2rem 0;
}
.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time {
  color: #aaa;
  letter-spacing: 0.5px;
}
.title {
  color: var(--title-color);
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
}
.line {
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  border-top: 0.2rem solid var(--text-color-light);
  display: block;
  width: 2rem;
}
.article:hover .line {
  width: 5rem;
}
@media screen and (max-width: 700px) {
  .article {
    padding: 1rem 0;
  }
  .title {
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 14em;
  }
  .describe {
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    padding: 0 0.5em;
  }
  .time {
    font-size: 14px;
  }
  .line {
    border-top: 0.15rem solid #353535;
  }
  .info-wrapper {
    display: none;
  }
}
</style>
