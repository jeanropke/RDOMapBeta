class Menu {
  static init() {
    this.tippyInstances = [];
    Loader.mapModelLoaded.then(this.activateHandlers.bind(this));
  }

  static reorderMenu(menu) {
    $(menu).children().sort(function (a, b) {
      return a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase());
    }).appendTo(menu);
  }

  static activateHandlers() {

    const help = document.getElementById('help-container');
    const $helpParagraph = $(help).children('p');
    $('.side-menu, .top-widget, .lat-lng-container')
      .on('mouseover mouseout', event => {
        const target = event.type === 'mouseover' ? event.target : event.relatedTarget;
        // keep current help if pointer jumped to help container or it overgrew current pointer pos.
        if (help.contains(target)) return;
        const helpTransId = $(target).closest('[data-help]').attr('data-help') || 'default';
        $helpParagraph.html(Language.get(`help.${helpTransId}`));
      });

    $('.camps-small-btn').on('click', function () {
      $(this).toggleClass('disabled');
      Camp.isSmall = !Camp.isSmall;
      Camp.locations.forEach(function(camp) { if(camp.layer['_map'] != null) camp.reinitMarker() });
    });
    $('.camps-large-btn').on('click', function () {
      $(this).toggleClass('disabled');
      Camp.isLarge = !Camp.isLarge;
      Camp.locations.forEach(function(camp) { if(camp.layer['_map'] != null) camp.reinitMarker() });
    });

    $('.shops-hide-btn').on('click', function () {
      Shop.locations.forEach(shop => { if(shop.onMap) shop.onMap = !shop.onMap});
    });
    $('.shops-show-btn').on('click', function () {
      Shop.locations.forEach(shop => { if(!shop.onMap) shop.onMap = !shop.onMap});
    });

    $('.gfh-hide-btn').on('click', function () {
      GunForHire.locations.forEach(_gfh => { if(_gfh.onMap) _gfh.onMap = !_gfh.onMap});
    });
    $('.gfh-show-btn').on('click', function () {
      GunForHire.locations.forEach(_gfh => { if(!_gfh.onMap) _gfh.onMap = !_gfh.onMap});
    });

    $('.plants-hide-btn').on('click', function () {
      PlantsCollection.locations.forEach(_plants => { if(_plants.onMap) _plants.onMap = !_plants.onMap});
    });
    $('.plants-show-btn').on('click', function () {
      PlantsCollection.locations.forEach(_plants => { if(!_plants.onMap) _plants.onMap = !_plants.onMap});
      setTimeout(() => PlantsCollection.layer.redraw(), 40);
    });

    $('.encounters-hide-btn').on('click', function () {
      Encounter.locations.forEach(_encounter => { if(_encounter.onMap) _encounter.onMap = !_encounter.onMap});
    });
    $('.encounters-show-btn').on('click', function () {
      Encounter.locations.forEach(_encounter => { if(!_encounter.onMap) _encounter.onMap = !_encounter.onMap});
    });
  }
}