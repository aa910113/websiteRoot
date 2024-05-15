const { createApp, ref, onMounted } = Vue;
createApp({
  setup() {
    let token = '';
    const loginSuccess = ref(false);
    onMounted(() => {
      login.value = false;
      const queryString = window.location.search;
      if (queryString) {
        token = queryString.split('token=')[1];
        document.cookie = `ching_token=${token}`;
        loginSuccess.value = true;
      }
    });

    const copiedSuccessfully = ref(false);
    const menuFlag = ref(false);

    const specificationFlag = ref(false);
    const specificationList = ref([
      '1.本活動由永恆世成有限公司主辦，主辦單位保有活動最終解釋、修改之權力。參加者於參加本活動之同時，即同意接受本活動注意事項、本網站使用規範及其他有關規定；若有違反主辦單位得取消其參加資格。',
      '2.若發現惡意程式破壞或盜用他人身份資料進行活動等不當情事，活動單位保有消得獎資格及參與本活動之權利。',
      '3.得獎者不得要求獎項折抵現金、退換、轉售(讓)或折換其他物品。',
      '4.獎品寄送地區僅限為台灣、金門、澎湖、馬祖地區，恕不郵寄獎項至海外地區。',
      '5.活動中獎者請務必詳細填寫正確資料，若資料有誤或不完整導致無法通知中獎人，將視同放棄得獎資格，恕不得要求主辦單位進行補發。',
      '6.若中獎人贈品價值超過新台幣1,000元，則中獎人需於收到中獎通知10日內，將主辦單位提供之中獎通知填寫完成，並寄回「10544 台北市松山區復興北路337號12樓」進行確認，經確認無誤後方才符合領獎資格。依中華民國稅法規定，若領獎金額超過台幣20,000元，依法中獎者須先行繳納10%稅金(稅額以市價計算)並由主辦單位代收代繳，使得領取活動獎金品或贈品。以上內容若經主辦單未審核通過、逾期或資料缺漏者，主辦單位不再進行通知。若通知信經招領逾期或不明原因等退回者，視同放棄且喪失中獎資格，主辦單位不再進行通知。',
      '7.得獎者因資格不符或自行放棄資格者，不另行網路公告，主辦單位並不再通知，亦不遞補。',
      '8.寄送贈品過程中，如遇損壞、錯遞、延遲或遺失，若非可歸責於主辦單位者，主辦單位將恕不進行補發及遞補。',
      '9.中獎之獎項如有其他規費，費用負擔時，包含但不限於過戶規費、手續費、保險費均由中獎者負擔。如中獎者不願繳納或未於主辦單位規定期限內繳納時，視同放棄，並不得要求兌換等值其他獎品及現金，如有放棄者主辦單位將恕不進行缺額遞補。',
      '10.本活動獎品獎項以實品為準，主辦單位將保留及更換其等值獎品的相關權利，所有獎項皆無法兌換現金、轉讓或更換其他商品，主辦單位對獎品日後之使用及維修不負任何責任。',
      '11.若經主辦單位發現惡意破壞或非法方式網路破壞票選程式而得獎將視同無效，將直接取消得獎資格，本公司恕不另行通知，亦不退件。',
      '12.參加者聲明並承諾所有登錄、填寫或提出之資料均為真實且正確，且未冒用或盜用任何第三人之資料；若有冒用或盜他人資料或個人登錄資料有不實、不全或不正確之情事，主辦單位將取消參加或得獎資格。如因此致無法通知其得獎訊息時，主辦單位將不負任何責任。對於參加者所提供個人資料，提交後均同意主辦單位於本活動範圍內均得蒐集、處理與利用。',
      '13.如有任何因行動裝置(智慧型手機、平板電腦)及電腦、網路、電話、技術或不可歸責於承辦單位之事由，而使參加者所登錄之資料有遲延、遺失、錯誤無法辨識或毀損等情況，主單位不負任何法律責任，參加者亦不得因此異議或請求賠償。',
      '14.本網站若因任何非主辦單位可掌握之因素(包含但不限於以下原因)如電腦病毒、程式錯誤、駭客..等，本活動小組將保留取消、終止或修改及暫停本活動之權利，並有權取消任何影響他人得獎權益之得獎者的得獎資格。',
      '15.未經本網站同意，任何人不能傳送、複製、修改、轉賣、及出版本網站的任何文章、商標、圖片、專利、概念、及智慧財產。',
      '16.主辦單位保有審核參加者之權利，及取消、終止、修改或暫停本活動辦法及獎品更動的權利。若有其他未盡事宜，悉依主辦單位相關規定或決定辦理。若經主辦單位發現惡意大量登錄，亦或是中獎者無法提供真實資料者，並經主辦單位確認，將直接取消抽獎兌獎資格，本公司恕不另行通知，如有造成對本公司損失之行為主辦單位保有法律追訴權。',
      '17.以上事項欲參加者應詳細閱讀，一經參加後，即視同參加者接受上述事項之約束，不得異議。',
      '18.參加本活動即同意將內容之著作使用權提供超人氣新體股份有限公司及永恆世成有限公司使用；包括文字及相關數位檔案為公開傳輸、公開播送、公開上映或發行等使用。使用平台包括不限於台灣達人秀之FB、IG等媒體平台使用；且本人同意由超人氣新媒體股份有限公司及永恆世成有限公司為著作人並享有著作財產權、著作人格權及其他一切權利(包括但不限於肖像權等)，並同時承諾對本活動並無任何權利。',
      '19.活動服務專線:(02) 7709-5168#624<br/>(服務時間:週一至週五,11:00-18:00例假日及國定假日暫不提供服務)。',
    ]);

    function selectMenuItem(i) {
      menuFlag.value = !menuFlag.value;
      if (i === 7) {
        specificationFlag.value = !specificationFlag.value;
      }
    }

    function showSpecification() {
      menuFlag.value = !menuFlag.value;
      specificationFlag.value = !specificationFlag.value;
    }

    const couponCode = ref('MZFSMC09');
    const copyCouponCode = async () => {
      await navigator.clipboard.writeText(couponCode.value);
      copiedSuccessfully.value = true;
    };

    const domain = 'https://test-event.ttshow.tw';

    onMounted(() => {
      getPosts();
    });

    function getPlatform(videoURL) {
      if (videoURL.includes('facebook')) {
        return 'facebook';
      } else if (videoURL.includes('youtube')) {
        return 'youtube';
      } else if (videoURL.includes('instagram')) {
        return 'instagram';
      } else {
        return 'unknown';
      }
    }
    function transformVideoURL(videoURL, platform) {
      if (platform === 'youtube') {
        return videoURL.replace('/shorts/', '/embed/');
      } else if (platform === 'facebook') {
        return videoURL
          .replace('://', '%3A%2F%2F')
          .replace('/reel/', '%2Freel%2F');
      } else {
        return videoURL;
      }
    }

    const postList = ref([]);
    async function getPosts() {
      const response = await fetch(`${domain}/api/crispyching2024/post`);
      const data = await response.json();

      for (let submission of data.data) {
        submission.platform = getPlatform(submission.video_url);
        submission.transformed_video_url = transformVideoURL(
          submission.video_url,
          submission.platform,
        );
      }

      postList.value = data.data.reduce((acc, curr, index) => {
        const chunkIndex = Math.floor(index / 2);
        if (!acc[chunkIndex]) {
          acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(curr);
        return acc;
      }, []);
    }

    const step = ref(1);
    const formError = ref(false);
    const videoUrlError = ref(false);
    const agree = ref(false);
    const agree2 = ref(false);
    const success = ref(false);
    const form = ref({
      submission_name: '',
      title: '',
      video_url: '',
      name: '',
      gender: null,
      phone: '',
      address: '',
    });

    const regex =
      /^(https:\/\/www\.)((instagram\.com\/reel\/|youtube\.com\/shorts\/)[a-zA-Z0-9]*|facebook\.com\/reel\/\d*)($|\/$|\?.*)/;
    function checkSignedUpInfo() {
      formError.value = false;
      if (
        !form.value.submission_name ||
        form.value.submission_name.length > 30
      ) {
        formError.value = true;
        return;
      }
      if (!form.value.title || form.value.title.length > 30) {
        formError.value = true;
        return;
      }
      if (!form.value.video_url) {
        formError.value = true;
        return;
      }
      if (!regex.test(form.value.video_url)) {
        videoUrlError.value = true;
        return;
      }
      if (!agree.value) {
        formError.value = true;
        return;
      }
      step.value = 2;
    }
    function checkReceiptInfo() {
      formError.value = false;
      if (!form.value.name || form.value.name.length > 30) {
        formError.value = true;
        return;
      }
      if (form.value.gender === null) {
        formError.value = true;
        return;
      }
      if (!form.value.phone || form.value.phone.length > 30) {
        formError.value = true;
        return;
      }
      if (!form.value.address || form.value.address.length > 255) {
        formError.value = true;
        return;
      }
      if (!agree2.value) {
        formError.value = true;
        return;
      }
      submitForm();
    }
    async function submitForm() {
      const response = await fetch(`${domain}/api/crispyching2024/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      });
      const data = await response.json();
      if (data.status === 200) {
        success.value = true;
        form.value = {
          submission_name: '',
          title: '',
          video_url: '',
          name: '',
          gender: null,
          phone: '',
          address: '',
        };
        agree.value = false;
        agree2.value = false;
      }
    }

    const isVoteTime = ref(false);
    const now = new Date();
    let voteStart = null;
    let voteEnd = null;

    onMounted(() => {
      getVotePeriod();
    });

    async function getVotePeriod() {
      const response = await fetch(`${domain}/api/crispyching2024/info`);
      const data = await response.json();
      voteStart = new Date(data.data.start_time);
      voteEnd = new Date(data.data.end_time);
    }

    function isVotePeriod(id) {
      if (now < voteStart || now > voteEnd) {
        isVoteTime.value = true;
      } else {
        isVoteTime.value = false;
        if (id) {
          isLogin(id);
        } else {
          checkSignedUpInfo();
        }
      }
    }
    const login = ref(true);
    function isLogin(id) {
      const ching_token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('ching_token'));
      if (ching_token) {
        token = ching_token.split('=')[1];
        vote(token, id);
      } else {
        login.value = true;
      }
    }

    const voteSuccess = ref(false);
    const voteFail = ref(false);
    const voteLimit = ref(false);
    async function vote(token, id) {
      const response = await fetch(`${domain}/api/crispyching2024/vote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: id }),
      });
      const data = await response.json();
      if (data.status === 200) {
        voteSuccess.value = true;
      } else if (data.status === 401) {
        document.cookie =
          'ching_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        token = '';
        login.value = true;
      } else if (data.status === 403) {
        if (data.code === 4033) {
          voteLimit.value = true;
        } else if (data.code === 4034) {
          voteFail.value = true;
        }
      }
    }

    onMounted(() => {
      const queryString = window.location.search;
      if (queryString) {
        id = queryString.split('id=')[1];
        getPost(id);
      }
    });
    const post = ref({
      id: null,
      submission_name: '',
      title: '',
      video_url: '',
      votes: null,
      ranking: null,
    });
    async function getPost(id) {
      const response = await fetch(`${domain}/api/crispyching2024/post/${id}`);
      const data = await response.json();
      data.data.platform = getPlatform(data.data.video_url);
      data.data.transformed_video_url = transformVideoURL(
        data.data.video_url,
        data.data.platform,
      );
      post.value = data.data;
    }

    return {
      menuFlag,
      specificationFlag,
      showSpecification,
      specificationList,
      copyCouponCode,
      copiedSuccessfully,
      postList,
      step,
      formError,
      videoUrlError,
      checkSignedUpInfo,
      form,
      agree,
      agree2,
      checkReceiptInfo,
      success,
      isVoteTime,
      isVotePeriod,
      selectMenuItem,
      loginSuccess,
      isLogin,
      login,
      voteSuccess,
      voteFail,
      voteLimit,
      post,
    };
  },
  delimiters: ['@{{', '}}'],
}).mount('#app');
