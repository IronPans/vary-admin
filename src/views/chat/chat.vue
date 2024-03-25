<template>
  <div class="va-page-box">
    <va-row :gutter="16" class="chat-box">
      <va-col :lg="4" class="chat-list">
        <va-card header="List">
          <div class="m-b-10">
            <va-input class="flex" placeholder="search" :border="true"></va-input>
          </div>
          <va-list :items="items">
            <template #item="{ item }">
              <va-avatar width="35px" :src="item.avatar" />
              <va-list-item-text>
                <h5 class="m-0 flex align-space-between justify-center">
                  <span class="text-truncate"
                    >{{ item.name
                    }}<va-badge
                      v-if="item.count > 0"
                      :count="item.count"
                      :fixed="false"
                      class="m-0 p-l-5"
                  /></span>
                  <small>{{ item.time }}</small>
                </h5>
                <p class="m-0 text-muted text-truncate">comming soom!</p>
              </va-list-item-text>
            </template>
            <!-- <va-list-item class="active">
              <va-avatar width="35px" src="images/avatar/1.jpg" />
              <va-list-item-text>
                <h5 class="m-0 flex align-space-between justify-center">
                  <span class="text-truncate">Tom</span>
                  <small>15:30</small>
                </h5>
                <p class="m-0 text-muted text-truncate">comming soom!</p>
              </va-list-item-text>
            </va-list-item>
            <va-list-item>
              <va-avatar width="35px" src="images/avatar/1.jpg" />
              <va-list-item-text>
                <h5 class="m-0 flex align-space-between justify-center">
                  <span class="text-truncate">
                    Tom
                    <va-badge :count="2" :fixed="false" class="m-0 p-l-5" />
                  </span>
                  <small>15:29</small>
                </h5>
                <p class="m-0 text-muted text-truncate">comming soom!</p>
              </va-list-item-text>
            </va-list-item>
            <va-list-item>
              <va-avatar width="35px" src="images/avatar/1.jpg" />
              <va-list-item-text>
                <h5 class="m-0 flex align-space-between justify-center">
                  <span class="text-truncate">Tom</span>
                  <small>15:29</small>
                </h5>
                <p class="m-0 text-muted text-truncate">comming soom!</p>
              </va-list-item-text>
            </va-list-item> -->
          </va-list>
        </va-card>
      </va-col>
      <va-col :lg="8">
        <va-card header="Tom">
          <div class="message-box">
            <div class="messages">
              <div class="message left">
                <div class="message-text">Hello</div>
                <va-avatar class="user-picture" src="images/avatar/1.jpg"></va-avatar>
              </div>
              <div class="message right">
                <div class="message-text">Hello</div>
                <va-avatar class="user-picture" src="images/avatar/1.jpg"></va-avatar>
              </div>
              <div class="message left">
                <div class="message-text">Hello</div>
                <va-avatar class="user-picture" src="images/avatar/1.jpg"></va-avatar>
              </div>
              <div class="message right">
                <div class="message-text">Hello</div>
                <va-avatar class="user-picture" src="images/avatar/1.jpg"></va-avatar>
              </div>
              <div class="message left">
                <div class="message-text">Hello</div>
                <va-avatar class="user-picture" src="images/avatar/1.jpg"></va-avatar>
              </div>
              <div class="message right">
                <div class="message-text">Hello</div>
                <va-avatar class="user-picture" src="images/avatar/1.jpg"></va-avatar>
              </div>
            </div>
            <div class="send-message">
              <va-input :border="true" placeholder="Message"></va-input>
              <va-button class="d-0" slot="endSlot" size="sm" theme="primary">
                <va-icon icon="send"></va-icon>
              </va-button>
            </div>
          </div>
        </va-card>
      </va-col>
    </va-row>

    <!-- <va-row class="m-t-20">
      <va-col :lg="6">
        <va-card>
          <va-scroll>
            <img
              :src="bg"
              style="float: left; width: 200px; margin: 10px 10px 10px 0"
              alt="Cool image"
              title="Cool image"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus, felis
              interdum condimentum consectetur, nisl libero elementum eros, vehicula
              congue lacus eros non diam. Cum sociis natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Vivamus mauris lorem, lacinia id
              tempus non, imperdiet et leo. Cras sit amet erat sit amet lacus egestas
              placerat. Aenean ultricies ultrices mauris ac congue. In vel tortor vel
              velit tristique tempus ac id nisi. Proin quis lorem velit. Nunc dui dui,
              blandit a ullamcorper vitae, congue fringilla lectus. Aliquam ultricies
              malesuada feugiat. Vestibulum placerat turpis et eros lobortis vel semper
              sapien pulvinar.
            </p>
            <p>
              Pellentesque rhoncus aliquet porta. Sed vel magna eu turpis pharetra
              consequat ut vitae lectus. In molestie sollicitudin mi sit amet convallis.
              Aliquam erat volutpat. Nullam feugiat placerat ipsum eget malesuada. Nulla
              facilisis nunc non dolor vehicula pretium. Sed dui magna, sodales id
              pharetra non, ullamcorper eu sapien. Mauris ac consectetur leo. Mauris
              consequat, lectus ut bibendum pulvinar, leo magna feugiat enim, eu commodo
              lacus sem vel ante. Sed tempus metus eget leo mollis vulputate. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Sed pulvinar rhoncus quam, vel semper tellus viverra id.
              Nulla rutrum porttitor odio, a rutrum purus gravida non. Etiam ac purus
              augue, eget vestibulum purus. Aenean venenatis ullamcorper augue, non
              consequat elit tempor sed. Donec velit sapien, volutpat sed ultricies
              egestas, semper a ante. Fusce dapibus, quam eget auctor suscipit, nibh leo
              posuere ante, at auctor nisi lacus in sem. Morbi interdum consectetur
              euismod. Cras accumsan est lacus. Nulla eleifend, eros vel consequat
              commodo, arcu nunc malesuada nunc, quis sagittis felis sem ac turpis.
            </p>
            <p>
              Nulla rhoncus elementum convallis. Mauris condimentum aliquet egestas. Ut
              iaculis nisi eget tellus accumsan venenatis. Maecenas imperdiet aliquam
              porta. Aenean ultrices dolor sed quam laoreet varius. Curabitur condimentum
              blandit erat, quis accumsan eros interdum vitae. Curabitur ligula arcu,
              sollicitudin vitae iaculis sed, blandit sit amet enim. Morbi ullamcorper,
              metus vel mollis tristique, arcu turpis malesuada nisi, at dignissim lorem
              odio a orci. Proin ultrices, ipsum ut vestibulum interdum, libero felis
              auctor mi, vitae convallis nisl justo ac tellus. Integer nec lacinia turpis.
              Etiam massa nisl, rhoncus quis rutrum in, pretium eu leo. Proin a velit ut
              nulla laoreet vestibulum. Curabitur eu elit vitae felis auctor tincidunt.
              Curabitur tincidunt, metus sed sollicitudin cursus, quam elit commodo erat,
              ut tempor erat sapien vitae velit. Morbi nec viverra erat.
            </p>
            <p>
              Nullam scelerisque facilisis pretium. Vivamus lectus leo, commodo ac
              sagittis ac, dictum a mi. Donec quis massa ut libero malesuada commodo in et
              risus. Fusce nunc dolor, aliquet vel rutrum in, molestie sit amet massa.
              Aliquam suscipit, justo a commodo condimentum, enim sapien fringilla ante,
              sed lobortis orci lectus in ante. Donec vel interdum est. Donec placerat
              cursus lacus, eu ultricies nisl tincidunt a. Fusce libero risus, sagittis
              eleifend iaculis aliquet, condimentum vitae diam. Suspendisse potenti. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Proin leo purus, sodales a venenatis luctus, faucibus ac enim.
              Sed id metus ac sem lobortis pretium. Mauris faucibus tempor scelerisque.
              Nunc vulputate interdum tortor, non tincidunt dui condimentum eget. Aenean
              in porttitor velit. Nam accumsan rhoncus risus id consectetur.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus, felis
              interdum condimentum consectetur, nisl libero elementum eros, vehicula
              congue lacus eros non diam. Cum sociis natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Vivamus mauris lorem, lacinia id
              tempus non, imperdiet et leo. Cras sit amet erat sit amet lacus egestas
              placerat. Aenean ultricies ultrices mauris ac congue. In vel tortor vel
              velit tristique tempus ac id nisi. Proin quis lorem velit. Nunc dui dui,
              blandit a ullamcorper vitae, congue fringilla lectus. Aliquam ultricies
              malesuada feugiat. Vestibulum placerat turpis et eros lobortis vel semper
              sapien pulvinar.
            </p>
            <p>
              Pellentesque rhoncus aliquet porta. Sed vel magna eu turpis pharetra
              consequat ut vitae lectus. In molestie sollicitudin mi sit amet convallis.
              Aliquam erat volutpat. Nullam feugiat placerat ipsum eget malesuada. Nulla
              facilisis nunc non dolor vehicula pretium. Sed dui magna, sodales id
              pharetra non, ullamcorper eu sapien. Mauris ac consectetur leo. Mauris
              consequat, lectus ut bibendum pulvinar, leo magna feugiat enim, eu commodo
              lacus sem vel ante. Sed tempus metus eget leo mollis vulputate. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Sed pulvinar rhoncus quam, vel semper tellus viverra id.
              Nulla rutrum porttitor odio, a rutrum purus gravida non. Etiam ac purus
              augue, eget vestibulum purus. Aenean venenatis ullamcorper augue, non
              consequat elit tempor sed. Donec velit sapien, volutpat sed ultricies
              egestas, semper a ante. Fusce dapibus, quam eget auctor suscipit, nibh leo
              posuere ante, at auctor nisi lacus in sem. Morbi interdum consectetur
              euismod. Cras accumsan est lacus. Nulla eleifend, eros vel consequat
              commodo, arcu nunc malesuada nunc, quis sagittis felis sem ac turpis.
            </p>
            <p>
              Nulla rhoncus elementum convallis. Mauris condimentum aliquet egestas. Ut
              iaculis nisi eget tellus accumsan venenatis. Maecenas imperdiet aliquam
              porta. Aenean ultrices dolor sed quam laoreet varius. Curabitur condimentum
              blandit erat, quis accumsan eros interdum vitae. Curabitur ligula arcu,
              sollicitudin vitae iaculis sed, blandit sit amet enim. Morbi ullamcorper,
              metus vel mollis tristique, arcu turpis malesuada nisi, at dignissim lorem
              odio a orci. Proin ultrices, ipsum ut vestibulum interdum, libero felis
              auctor mi, vitae convallis nisl justo ac tellus. Integer nec lacinia turpis.
              Etiam massa nisl, rhoncus quis rutrum in, pretium eu leo. Proin a velit ut
              nulla laoreet vestibulum. Curabitur eu elit vitae felis auctor tincidunt.
              Curabitur tincidunt, metus sed sollicitudin cursus, quam elit commodo erat,
              ut tempor erat sapien vitae velit. Morbi nec viverra erat.
            </p>
            <p>
              Nullam scelerisque facilisis pretium. Vivamus lectus leo, commodo ac
              sagittis ac, dictum a mi. Donec quis massa ut libero malesuada commodo in et
              risus. Fusce nunc dolor, aliquet vel rutrum in, molestie sit amet massa.
              Aliquam suscipit, justo a commodo condimentum, enim sapien fringilla ante,
              sed lobortis orci lectus in ante. Donec vel interdum est. Donec placerat
              cursus lacus, eu ultricies nisl tincidunt a. Fusce libero risus, sagittis
              eleifend iaculis aliquet, condimentum vitae diam. Suspendisse potenti. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Proin leo purus, sodales a venenatis luctus, faucibus ac enim.
              Sed id metus ac sem lobortis pretium. Mauris faucibus tempor scelerisque.
              Nunc vulputate interdum tortor, non tincidunt dui condimentum eget. Aenean
              in porttitor velit. Nam accumsan rhoncus risus id consectetur.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus, felis
              interdum condimentum consectetur, nisl libero elementum eros, vehicula
              congue lacus eros non diam. Cum sociis natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Vivamus mauris lorem, lacinia id
              tempus non, imperdiet et leo. Cras sit amet erat sit amet lacus egestas
              placerat. Aenean ultricies ultrices mauris ac congue. In vel tortor vel
              velit tristique tempus ac id nisi. Proin quis lorem velit. Nunc dui dui,
              blandit a ullamcorper vitae, congue fringilla lectus. Aliquam ultricies
              malesuada feugiat. Vestibulum placerat turpis et eros lobortis vel semper
              sapien pulvinar.
            </p>
            <p>
              Pellentesque rhoncus aliquet porta. Sed vel magna eu turpis pharetra
              consequat ut vitae lectus. In molestie sollicitudin mi sit amet convallis.
              Aliquam erat volutpat. Nullam feugiat placerat ipsum eget malesuada. Nulla
              facilisis nunc non dolor vehicula pretium. Sed dui magna, sodales id
              pharetra non, ullamcorper eu sapien. Mauris ac consectetur leo. Mauris
              consequat, lectus ut bibendum pulvinar, leo magna feugiat enim, eu commodo
              lacus sem vel ante. Sed tempus metus eget leo mollis vulputate. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Sed pulvinar rhoncus quam, vel semper tellus viverra id.
              Nulla rutrum porttitor odio, a rutrum purus gravida non. Etiam ac purus
              augue, eget vestibulum purus. Aenean venenatis ullamcorper augue, non
              consequat elit tempor sed. Donec velit sapien, volutpat sed ultricies
              egestas, semper a ante. Fusce dapibus, quam eget auctor suscipit, nibh leo
              posuere ante, at auctor nisi lacus in sem. Morbi interdum consectetur
              euismod. Cras accumsan est lacus. Nulla eleifend, eros vel consequat
              commodo, arcu nunc malesuada nunc, quis sagittis felis sem ac turpis.
            </p>
            <p>
              Nulla rhoncus elementum convallis. Mauris condimentum aliquet egestas. Ut
              iaculis nisi eget tellus accumsan venenatis. Maecenas imperdiet aliquam
              porta. Aenean ultrices dolor sed quam laoreet varius. Curabitur condimentum
              blandit erat, quis accumsan eros interdum vitae. Curabitur ligula arcu,
              sollicitudin vitae iaculis sed, blandit sit amet enim. Morbi ullamcorper,
              metus vel mollis tristique, arcu turpis malesuada nisi, at dignissim lorem
              odio a orci. Proin ultrices, ipsum ut vestibulum interdum, libero felis
              auctor mi, vitae convallis nisl justo ac tellus. Integer nec lacinia turpis.
              Etiam massa nisl, rhoncus quis rutrum in, pretium eu leo. Proin a velit ut
              nulla laoreet vestibulum. Curabitur eu elit vitae felis auctor tincidunt.
              Curabitur tincidunt, metus sed sollicitudin cursus, quam elit commodo erat,
              ut tempor erat sapien vitae velit. Morbi nec viverra erat.
            </p>
            <p>
              Nullam scelerisque facilisis pretium. Vivamus lectus leo, commodo ac
              sagittis ac, dictum a mi. Donec quis massa ut libero malesuada commodo in et
              risus. Fusce nunc dolor, aliquet vel rutrum in, molestie sit amet massa.
              Aliquam suscipit, justo a commodo condimentum, enim sapien fringilla ante,
              sed lobortis orci lectus in ante. Donec vel interdum est. Donec placerat
              cursus lacus, eu ultricies nisl tincidunt a. Fusce libero risus, sagittis
              eleifend iaculis aliquet, condimentum vitae diam. Suspendisse potenti. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Proin leo purus, sodales a venenatis luctus, faucibus ac enim.
              Sed id metus ac sem lobortis pretium. Mauris faucibus tempor scelerisque.
              Nunc vulputate interdum tortor, non tincidunt dui condimentum eget. Aenean
              in porttitor velit. Nam accumsan rhoncus risus id consectetur.
            </p>
          </va-scroll>
        </va-card>
      </va-col>
    </va-row> -->
  </div>
</template>

<script setup lang="ts">
import avatarBg from "@assets/images/avatar/1.jpg";

const items = [
  {
    avatar: avatarBg,
    name: "Tom",
    time: "15:50",
    count: 2,
    clz: "active",
  },

  {
    avatar: avatarBg,
    name: "Tom",
    time: "15:29",
    count: 5,
  },

  {
    avatar: avatarBg,
    name: "Tom",
    time: "19:29",
  },
];

// const bg = "images/bg/1.png";
// const prefixCls = 'va-chat';

// export default {
//     name: 'va-chat'
// }
</script>
