<template>
  <div class="image-list">
    <div class="action-head">
      <el-radio-group
        v-model="collect"
        size="mini"
        @change="loadImages(1)"
      >
        <el-radio-button
          :label="false"
        >全部</el-radio-button>
        <el-radio-button
          :label="true"
        >收藏</el-radio-button>
      </el-radio-group>
      <el-button
        v-if="isShowAdd"
        size="mini"
        type="success"
        @click="dialogUploadVisible = true"
      >上传素材</el-button>
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        class="image-item"
        @click.native="selected = index"
      >
        <el-image
          style="height: 100px"
          :src="img.url"
          fit="cover"
        >
        </el-image>
        <div class="selected" v-if="isShowSelected && selected === index"></div>
        <div v-if="isShowAction" class="image-action">
          <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="small"
            @click="onCollect(img)"
            :loading="img.loading"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete-solid"
            circle
            :loading="img.loading"
            @click="onDelete(img)"
          ></el-button>
          <!-- <i
            :class="{
              'el-icon-star-on': img.is_collected,
              'el-icon-star-off': !img.is_collected
            }"
            @click="onCollect(img)"
          ></i> -->
          <!-- <i class="el-icon-delete-solid"></i> -->
        </div>
      </el-col>
    </el-row>
    <!-- 数据分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :current-page.sync="page"
      @current-change="onPageChange"
    >
    </el-pagination>
    <!-- 弹出层 -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!-- upload 组件本身就支持请求提交上传操作，不用自己发请求，upload 会自己发送 -->
      <!--
        请求方法：默认 POST
        请求路径：action，必须写完整路径
        请求头：headers
      -->
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'

export default {
  name: 'ImageList',
  components: {},
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowAction: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 10,
      page: 1,
      selected: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(img => {
          img.loading = false
        })
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },

    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },

    onPageChange (page) {
      this.loadImages(page)
    },

    onCollect (img) {
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        img.loading = false
      })
    },

    onDelete (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        this.loadImages(this.page)
        img.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item {
  position: relative;
}

.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}

.selected {
   background: url(./selected.png) no-repeat;
   background-size: cover;
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   display: flex;
   justify-content: center;
   align-items: center;
}
</style>
